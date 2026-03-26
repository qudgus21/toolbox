import type { CalculatorResult } from '../types';

export function process(
  fields: Record<string, unknown>,
): CalculatorResult {
  const ipAddress = String(fields.ipAddress || '').trim();
  const subnetMask = String(fields.subnetMask || '/24').trim();

  if (!ipAddress) return { output: '' };

  // Parse IP
  const ipParts = ipAddress.split('.').map(Number);
  if (ipParts.length !== 4 || ipParts.some(p => !isFinite(p) || p < 0 || p > 255)) {
    return { output: '' };
  }

  // Parse CIDR
  const cidr = parseInt(subnetMask.replace('/', ''), 10);
  if (!isFinite(cidr) || cidr < 0 || cidr > 32) return { output: '' };

  const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
  const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcardInt = (~maskInt) >>> 0;

  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;
  const firstHostInt = cidr >= 31 ? networkInt : (networkInt + 1) >>> 0;
  const lastHostInt = cidr >= 31 ? broadcastInt : (broadcastInt - 1) >>> 0;
  const totalHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.pow(2, 32 - cidr) - 2;

  const toIP = (n: number) =>
    `${(n >>> 24) & 255}.${(n >>> 16) & 255}.${(n >>> 8) & 255}.${n & 255}`;

  const network = toIP(networkInt);
  const broadcast = toIP(broadcastInt);
  const firstHost = toIP(firstHostInt);
  const lastHost = toIP(lastHostInt);
  const mask = toIP(maskInt);
  const wildcard = toIP(wildcardInt);

  const ipClass = getIPClass(ipParts[0]);
  const isPrivate = checkPrivate(ipParts);

  return {
    output: `${network}/${cidr}`,
    table: [
      { label: 'IP Address', value: ipAddress },
      { label: 'CIDR', value: `/${cidr}` },
      { label: 'Subnet Mask', value: mask },
      { label: 'Wildcard Mask', value: wildcard },
      { label: 'Network Address', value: network },
      { label: 'Broadcast Address', value: broadcast },
      { label: 'First Host', value: firstHost },
      { label: 'Last Host', value: lastHost },
      { label: 'Total Hosts', value: totalHosts.toLocaleString('en-US') },
      { label: 'IP Class', value: ipClass },
      { label: 'Private', value: isPrivate ? 'Yes' : 'No' },
    ],
    breakdown: [
      { label: 'IP (binary)', value: toBinary(ipInt) },
      { label: 'Mask (binary)', value: toBinary(maskInt) },
      { label: 'Network', value: `${network}/${cidr}`, highlight: true },
      { label: 'Host Range', value: `${firstHost} — ${lastHost}`, highlight: true },
      { label: 'Usable Hosts', value: totalHosts.toLocaleString('en-US'), highlight: true },
    ],
  };
}

function toBinary(n: number): string {
  const bin = (n >>> 0).toString(2).padStart(32, '0');
  return `${bin.slice(0, 8)}.${bin.slice(8, 16)}.${bin.slice(16, 24)}.${bin.slice(24, 32)}`;
}

function getIPClass(first: number): string {
  if (first < 128) return 'A';
  if (first < 192) return 'B';
  if (first < 224) return 'C';
  if (first < 240) return 'D (Multicast)';
  return 'E (Reserved)';
}

function checkPrivate(parts: number[]): boolean {
  if (parts[0] === 10) return true;
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  if (parts[0] === 192 && parts[1] === 168) return true;
  return false;
}
