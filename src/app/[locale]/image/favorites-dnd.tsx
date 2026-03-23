"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { reorderAppFavorites } from "@/lib/storage";

const FAV_DRAG_HINT_KEY = "image-fav-drag-hint-seen";

function SortableFavCard({
  slug,
  children,
  disableTransition,
  didDragRef,
  hintText,
}: {
  slug: string;
  children: React.ReactNode;
  disableTransition: boolean;
  didDragRef: React.RefObject<boolean>;
  hintText: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id: slug });

  const [showHint, setShowHint] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(FAV_DRAG_HINT_KEY)) return;
    setShowHint(true);
    localStorage.setItem(FAV_DRAG_HINT_KEY, "1");
  }, []);

  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(() => setShowHint(false), 2500);
    return () => clearTimeout(t);
  }, [showHint]);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition:
      isDragging || disableTransition
        ? "none"
        : "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={handleMouseEnter}
      onClickCapture={(e) => {
        if (didDragRef.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      className={cn(
        "relative cursor-grab active:cursor-grabbing",
        isDragging && "scale-105 opacity-80",
      )}
    >
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-lg pointer-events-none"
          >
            {hintText}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}

interface FavoritesDndProps {
  favSlugs: string[];
  setFavSlugs: (slugs: string[]) => void;
  viewMode: "grid" | "list";
  disableFavTransition: boolean;
  setDisableFavTransition: (v: boolean) => void;
  didDragRef: React.RefObject<boolean>;
  hintText: string;
  favGridRef: React.RefObject<HTMLDivElement | null>;
  children: (slug: string) => React.ReactNode;
}

export function FavoritesDnd({
  favSlugs,
  setFavSlugs,
  viewMode,
  disableFavTransition,
  setDisableFavTransition,
  didDragRef,
  hintText,
  favGridRef,
  children,
}: FavoritesDndProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragStart() {
    didDragRef.current = true;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setTimeout(() => { didDragRef.current = false; }, 0);

    if (!over || active.id === over.id) return;
    const oldIndex = favSlugs.indexOf(active.id as string);
    const newIndex = favSlugs.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;
    setDisableFavTransition(true);
    const newOrder = arrayMove(favSlugs, oldIndex, newIndex);
    setFavSlugs(newOrder);
    reorderAppFavorites("image", newOrder);
    requestAnimationFrame(() => {
      setDisableFavTransition(false);
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={favSlugs}
        strategy={viewMode === "list" ? verticalListSortingStrategy : rectSortingStrategy}
      >
        <div
          ref={favGridRef}
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              : "flex flex-col gap-2"
          }
        >
          {favSlugs.map((slug) => (
            <SortableFavCard
              key={`fav-${slug}`}
              slug={slug}
              disableTransition={disableFavTransition}
              didDragRef={didDragRef}
              hintText={hintText}
            >
              {children(slug)}
            </SortableFavCard>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
