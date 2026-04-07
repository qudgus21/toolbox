import type { ToolContentMap } from "../tool-content-types";

export const calculatorContentRu: ToolContentMap = {
  "percentage-calculator": {
    howTo: {
      title: "Как вычислить проценты",
      steps: [
        "Enter the original number or base value in the first field",
        "Enter the percentage value you want to calculate",
        "Select the calculation type (increase, decrease, or percentage of)",
        "View the instant result and percentage breakdown",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate percentage increase and decrease",
        "Find what percentage one number is of another",
        "Reverse calculation to find original value",
        "Real-time results with detailed breakdowns",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Use for discounts, tax calculations, and grade improvements",
        "Understanding percentage changes helps with budgeting and financial planning",
        "Percentage calculations are essential for comparing relative changes",
      ],
    },
    faq: [
      { question: "How is percentage increase different from percentage of?", answer: "Percentage increase shows the change from an original value (e.g., 50 to 75 is a 50% increase). Percentage of shows what portion one number represents of another (e.g., 75 is 50% of 150)." },
      { question: "Can I use this to calculate discounts?", answer: "Yes, this tool is perfect for discounts. Enter the original price and discount percentage to instantly see your savings and final price." },
      { question: "Is my data stored when I use this calculator?", answer: "No, all calculations happen entirely in your browser. Your numbers are never stored or sent to any server." },
    ],
  },
  "scientific-calculator": {
    howTo: {
      title: "Как использовать научный калькулятор",
      steps: [
        "Enter numbers using the numeric keypad or keyboard",
        "Select mathematical functions (sin, cos, log, power, etc.)",
        "Apply trigonometric, logarithmic, or exponential operations",
        "View results with full precision and calculation history",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Advanced trigonometric and inverse functions",
        "Natural and base-10 logarithms",
        "Exponential and power calculations",
        "Factorial and combination functions",
        "Angle conversion between degrees and radians",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Perfect for engineering, physics, and advanced mathematics",
        "Save frequently used calculations for quick reference",
        "Toggle between degree and radian modes for angle calculations",
      ],
    },
    faq: [
      { question: "What's the difference between degrees and radians?", answer: "Degrees divide a circle into 360 parts; radians use the circle's radius. Most programming languages use radians, while degrees are more intuitive for everyday use." },
      { question: "Can I use this for complex mathematical problems?", answer: "Yes, this scientific calculator handles trigonometric, logarithmic, and exponential functions needed for engineering, physics, and advanced math courses." },
      { question: "Are my calculations private?", answer: "Absolutely. Everything runs in your browser without connecting to any server, so your calculations remain completely private." },
    ],
  },
  "ratio-calculator": {
    howTo: {
      title: "Как вычислить отношения",
      steps: [
        "Enter the first number and second number of your ratio",
        "The calculator automatically simplifies to the lowest terms",
        "View equivalent ratios and scaled proportions",
        "Use results for recipes, scaling, or proportional comparisons",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Simplify ratios to lowest terms",
        "Calculate equivalent ratios at different scales",
        "Scale up or down proportionally",
        "Compare multiple ratios easily",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Essential for cooking, construction, and design scaling",
        "Ratios help understand proportional relationships in data",
        "Use for mixing solutions, adjusting recipes, or resizing images",
      ],
    },
    faq: [
      { question: "How do I scale a recipe using ratios?", answer: "Calculate the ratio of your desired serving size to the original recipe, then multiply all ingredients by this ratio to get the correct amounts." },
      { question: "What does simplifying a ratio mean?", answer: "Simplifying means reducing a ratio to its lowest terms, like converting 10:20 to 1:2, making it easier to understand and work with." },
      { question: "Will my recipe measurements stay private?", answer: "Yes, all ratio calculations happen locally in your browser with no data transmission to external servers." },
    ],
  },
  "gcd-lcm": {
    howTo: {
      title: "Как найти НОД и НОК",
      steps: [
        "Enter two or more numbers into the calculator fields",
        "The tool instantly calculates the Greatest Common Divisor",
        "View the Least Common Multiple in the results",
        "Use these values for fraction simplification and problem solving",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Find GCD and LCM simultaneously for multiple numbers",
        "Prime factorization display for understanding divisibility",
        "Support for large numbers",
        "Step-by-step calculation breakdown",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "GCD is useful for simplifying fractions to lowest terms",
        "LCM helps find common denominators for fraction operations",
        "Essential for number theory, algebra, and competitive programming",
      ],
    },
    faq: [
      { question: "Why do I need GCD and LCM?", answer: "GCD simplifies fractions to lowest terms, while LCM finds common denominators for adding or subtracting fractions. Both are essential for fraction operations." },
      { question: "Can I find GCD and LCM for more than two numbers?", answer: "Yes, this calculator finds both GCD and LCM for any number of inputs, all at once." },
      { question: "Is this calculation done securely?", answer: "Completely. All GCD and LCM calculations run in your browser without any data leaving your device." },
    ],
  },
  "factorial": {
    howTo: {
      title: "Как вычислить факториал",
      steps: [
        "Enter a positive integer (0-170 supported)",
        "The calculator computes the factorial instantly",
        "View the complete result with calculation steps",
        "Use for permutations, combinations, and probability",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Instant factorial calculation up to 170!",
        "Displays both result and expanded form for small numbers",
        "Handles very large numbers efficiently",
        "Shows calculation steps and mathematical notation",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Factorials grow extremely fast; 13! is already over 6 billion",
        "Used in probability, statistics, and combinatorics",
        "Factorial of 0 is defined as 1 by mathematical convention",
      ],
    },
    faq: [
      { question: "Why is 0! equal to 1?", answer: "By mathematical convention, 0! is defined as 1. This makes many formulas work correctly and is essential for combinatorics calculations." },
      { question: "What's the largest factorial you can calculate?", answer: "This calculator supports factorials up to 170!, which is already an astronomically large number." },
      { question: "Is factorial data stored anywhere?", answer: "No, your factorial calculations are performed entirely in your browser and never transmitted to any external server." },
    ],
  },
  "prime-checker": {
    howTo: {
      title: "Как проверить простые числа",
      steps: [
        "Enter any positive integer into the calculator",
        "The tool instantly determines if it's prime or composite",
        "View the factors if the number is composite",
        "Learn about the properties of prime and composite numbers",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Instantly identify prime and composite numbers",
        "List all factors for composite numbers",
        "Find the nearest prime numbers",
        "Efficient algorithm handles large numbers",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Prime numbers are crucial in cryptography and data security",
        "All even numbers except 2 are composite",
        "Useful for number theory problems and mathematical exploration",
      ],
    },
    faq: [
      { question: "Is 1 considered a prime number?", answer: "No, 1 is neither prime nor composite by definition. Prime numbers are defined as numbers greater than 1 with exactly two factors: 1 and itself." },
      { question: "Why are prime numbers important?", answer: "Prime numbers are fundamental in cryptography, encryption, and data security. They're also essential in mathematics and computer science." },
      { question: "Can you check if my numbers are prime without storing them?", answer: "Absolutely. All prime number checks happen entirely in your browser—nothing is saved or sent to servers." },
    ],
  },
  "logarithm": {
    howTo: {
      title: "Как вычислить логарифмы",
      steps: [
        "Enter the number you want to find the logarithm for",
        "Select the logarithm base (natural log, base 10, or custom)",
        "The calculator computes the result instantly",
        "Use for exponential equations, pH calculations, and data scaling",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Natural logarithm (ln) calculations",
        "Common logarithm (log base 10) support",
        "Custom base logarithm calculations",
        "Verify results with reverse exponential calculations",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Logarithms are inverse operations of exponentials",
        "Used in pH scale, Richter scale, and sound decibels",
        "Essential for solving exponential and growth equations",
      ],
    },
    faq: [
      { question: "What does logarithm actually mean?", answer: "A logarithm answers the question: 'What power must I raise the base to, to get this number?' For example, log₁₀(100) = 2 because 10² = 100." },
      { question: "When would I use logarithms in real life?", answer: "Logarithms are used in pH calculations, earthquake magnitudes (Richter scale), sound intensity (decibels), and population growth models." },
      { question: "Is my data private when calculating logarithms?", answer: "Yes, all logarithm calculations are computed locally in your browser with no data transmission to any server." },
    ],
  },
  "quadratic-solver": {
    howTo: {
      title: "Как решить квадратные уравнения",
      steps: [
        "Enter coefficients a, b, and c for equation ax² + bx + c = 0",
        "The calculator uses the quadratic formula to find solutions",
        "View both real and complex roots",
        "See the discriminant value and detailed steps",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Solve any quadratic equation with real or complex roots",
        "Discriminant calculation to predict solution types",
        "Step-by-step solution breakdown",
        "Vertex and axis of symmetry information",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Discriminant > 0 means two real roots, = 0 means one root, < 0 means complex roots",
        "Used extensively in physics, engineering, and algebra",
        "The quadratic formula always works regardless of factorization",
      ],
    },
    faq: [
      { question: "What does the discriminant tell me?", answer: "The discriminant indicates how many real solutions exist: if positive you get 2 real roots, if zero you get 1 root, and if negative you get complex roots." },
      { question: "Can I solve equations where a equals zero?", answer: "If a = 0, it's not a quadratic equation. This solver requires a ≠ 0. If a = 0, you have a linear equation instead." },
      { question: "Are my equation solutions stored on any server?", answer: "No, all solutions are calculated entirely in your browser and are never stored or transmitted." },
    ],
  },
  "matrix-calculator": {
    howTo: {
      title: "Как вычислить матрицы",
      steps: [
        "Input matrix dimensions and values into the grid",
        "Select the operation (addition, subtraction, multiplication, transpose, etc.)",
        "The calculator performs the matrix operation",
        "View the result matrix with precise calculations",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Matrix addition and subtraction",
        "Matrix multiplication and transpose operations",
        "Determinant calculation for square matrices",
        "Inverse matrix computation",
        "Scalar multiplication support",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Matrix multiplication requires compatible dimensions",
        "Determinant helps solve systems of linear equations",
        "Used in computer graphics, engineering, and data science",
      ],
    },
    faq: [
      { question: "When can I multiply two matrices?", answer: "You can multiply matrices A and B only if the number of columns in A equals the number of rows in B." },
      { question: "What does the transpose of a matrix do?", answer: "Transpose swaps rows with columns. If a matrix is m×n, its transpose is n×m, with element (i,j) becoming (j,i)." },
      { question: "Is my matrix data kept private?", answer: "Yes, all matrix calculations happen locally in your browser without any data storage on external servers." },
    ],
  },
  "mean-median-mode": {
    howTo: {
      title: "Как вычислить среднее, медиану и моду",
      steps: [
        "Enter your dataset values separated by commas or spaces",
        "The calculator automatically sorts and analyzes the data",
        "View mean (average), median (middle), and mode (most frequent)",
        "Use for data analysis and statistical summaries",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate mean, median, and mode in one calculation",
        "Identify multiple modes if present",
        "Show sorted dataset and frequency distribution",
        "Handle both positive and negative numbers",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Mean is affected by outliers; median is more robust for skewed data",
        "Mode shows the most common value in a dataset",
        "Together, these measures give a complete picture of data distribution",
      ],
    },
    faq: [
      { question: "Which measure is best to use—mean, median, or mode?", answer: "Mean is good for normally distributed data. Use median for skewed data with outliers. Mode shows the most common value, useful for categorical data." },
      { question: "What if my dataset has no mode?", answer: "If all values appear equally often, there's no mode. Some datasets have one mode, while others are bimodal or multimodal." },
      { question: "Are my dataset values stored anywhere?", answer: "No, all calculations are done in your browser. Your data is never stored or transmitted to any server." },
    ],
  },
  "standard-deviation": {
    howTo: {
      title: "Как вычислить стандартное отклонение",
      steps: [
        "Enter your dataset values separated by commas or spaces",
        "Select whether it's a sample or population dataset",
        "The calculator computes standard deviation instantly",
        "View variance and other statistical measures",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate population and sample standard deviation",
        "Compute variance and mean automatically",
        "Show step-by-step calculation process",
        "Identify outliers using standard deviation ranges",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Standard deviation measures how spread out data is from the mean",
        "Use sample standard deviation (n-1) for data samples",
        "About 68% of data falls within 1 standard deviation of the mean",
      ],
    },
    faq: [
      { question: "What's the difference between population and sample standard deviation?", answer: "Population SD uses all data (divide by n). Sample SD uses a sample from larger population (divide by n-1) to give an unbiased estimate." },
      { question: "What does a small standard deviation mean?", answer: "A small standard deviation means data points are clustered close to the mean. A large SD means values are spread out across a wider range." },
      { question: "Is my statistical data completely private?", answer: "Absolutely. All standard deviation calculations run locally in your browser without storing or transmitting your data." },
    ],
  },
  "probability": {
    howTo: {
      title: "Как вычислить вероятность",
      steps: [
        "Enter the number of favorable outcomes",
        "Enter the total number of possible outcomes",
        "The calculator computes probability and odds",
        "View results as percentage, decimal, and fraction",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate basic probability (0 to 1 range)",
        "Convert between probability and odds",
        "Show results as percentage, decimal, and fraction",
        "Combined and conditional probability calculations",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Probability of 0 means impossible; 1 means certain",
        "Probabilities always range from 0 to 1 (or 0% to 100%)",
        "Used in games, weather forecasting, insurance, and risk assessment",
      ],
    },
    faq: [
      { question: "What's the difference between probability and odds?", answer: "Probability is favorable outcomes divided by total outcomes (0 to 1). Odds compare favorable outcomes to unfavorable ones (e.g., 1:4)." },
      { question: "Can probability be greater than 1?", answer: "No, probability always ranges from 0 to 1. A probability above 1 or below 0 is impossible and indicates an error in calculation." },
      { question: "Will my probability calculations be kept private?", answer: "Yes, all calculations happen in your browser with no data transmission or storage on external servers." },
    ],
  },
  "permutation-combination": {
    howTo: {
      title: "Как вычислить перестановки и комбинации",
      steps: [
        "Enter the total number of items (n)",
        "Enter the number of items to choose (r)",
        "Select between permutation (order matters) or combination",
        "View the result and calculation breakdown",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate permutations (nPr) and combinations (nCr)",
        "Understand the difference between order-dependent and order-independent selection",
        "Support for large numbers with efficient calculation",
        "Show factorial formula breakdown",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Permutations count arrangements where order matters (passwords, arrangements)",
        "Combinations count selections where order doesn't matter (teams, groups)",
        "Essential for probability, statistics, and competitive programming",
      ],
    },
    faq: [
      { question: "When should I use permutations vs combinations?", answer: "Use permutations when order matters (e.g., arranging books on a shelf). Use combinations when order doesn't matter (e.g., selecting 3 people for a team)." },
      { question: "Why are permutation values always larger than combinations?", answer: "Because permutations count every different ordering as separate, while combinations treat different orderings as the same selection." },
      { question: "Are these calculations performed locally?", answer: "Yes, all permutation and combination calculations happen entirely in your browser without any external storage or transmission." },
    ],
  },
  "z-score": {
    howTo: {
      title: "Как вычислить Z-оценку",
      steps: [
        "Enter the individual data value you want to analyze",
        "Input the mean of your dataset",
        "Enter the standard deviation",
        "View the Z-score and percentile rank",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate Z-score to standardize data points",
        "Determine percentile rank and probability",
        "Identify outliers using standard deviation thresholds",
        "Show interpretation of Z-score significance",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Z-score of 0 means the value equals the mean",
        "Positive Z-scores are above mean; negative are below",
        "Used to compare values from different datasets or distributions",
      ],
    },
    faq: [
      { question: "How do I interpret a Z-score?", answer: "A Z-score tells you how many standard deviations away from the mean a value is. Z-score of 2 means 2 standard deviations above mean." },
      { question: "What Z-scores indicate outliers?", answer: "Values with Z-scores beyond ±3 are typically considered extreme outliers. Z-scores beyond ±2 may indicate unusual values worth investigating." },
      { question: "Is my data calculated privately?", answer: "Completely. Z-score calculations happen in your browser with no data storage or transmission to any server." },
    ],
  },
  "confidence-interval": {
    howTo: {
      title: "Как вычислить доверительный интервал",
      steps: [
        "Enter the sample mean and standard deviation",
        "Input your sample size",
        "Select the confidence level (90%, 95%, or 99%)",
        "View the confidence interval range",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate confidence intervals at common levels (90%, 95%, 99%)",
        "Support both population and sample standard deviation",
        "Show margin of error clearly",
        "T-distribution support for small sample sizes",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Higher confidence level means wider interval (more certainty, less precision)",
        "95% confidence is the most commonly used standard",
        "Used in polling, surveys, and scientific research",
      ],
    },
    faq: [
      { question: "What does a 95% confidence interval mean?", answer: "It means if you repeated your survey many times, about 95% of the confidence intervals calculated would contain the true population value." },
      { question: "Why would I choose 99% over 95%?", answer: "99% confidence gives more certainty but creates a wider interval. Use it for critical decisions. 95% is standard for most research." },
      { question: "Is my survey data kept private?", answer: "Yes, all calculations happen locally in your browser. Your data is never stored on or transmitted to external servers." },
    ],
  },
  "regression": {
    howTo: {
      title: "How to Perform Regression Analysis",
      steps: [
        "Enter paired X and Y values (one pair per row or comma-separated)",
        "The calculator performs linear regression analysis",
        "View the equation, R-squared value, and trend line",
        "Use for predictions and understanding relationships",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Linear regression equation calculation",
        "R-squared value for goodness of fit",
        "Prediction values for new X inputs",
        "Scatter plot visualization with trend line",
        "Correlation coefficient calculation",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "R² closer to 1 indicates a better fit to the data",
        "Regression helps predict future values based on historical data",
        "Used in economics, finance, marketing, and scientific research",
      ],
    },
    faq: [
      { question: "What does R-squared tell me?", answer: "R-squared measures how well your data fits the regression line. R² = 0.8 means the model explains 80% of the variation in your data." },
      { question: "Can I make predictions beyond my data range?", answer: "Technically yes, but extrapolation beyond your data range is less reliable. Only predict within or near your original data values." },
      { question: "Is my regression data stored anywhere?", answer: "No, all regression calculations are performed locally in your browser without any storage or server transmission." },
    ],
  },
  "trigonometry": {
    howTo: {
      title: "How to Calculate Trigonometric Functions",
      steps: [
        "Enter an angle value in degrees or radians",
        "Select the trigonometric function (sin, cos, tan, etc.)",
        "Choose between basic and inverse functions",
        "View results with all related trig values",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate sine, cosine, tangent and their inverses",
        "Support for both degrees and radians",
        "Cotangent, secant, and cosecant functions",
        "Hyperbolic trigonometric functions",
        "Complete trigonometric reference table",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Remember SOH-CAH-TOA for basic trigonometry in right triangles",
        "Most programming uses radians; conversion is often needed",
        "Used in physics, engineering, navigation, and animation",
      ],
    },
    faq: [
      { question: "What does sine, cosine, and tangent represent?", answer: "In a right triangle, sine = opposite/hypotenuse, cosine = adjacent/hypotenuse, tangent = opposite/adjacent (SOH-CAH-TOA)." },
      { question: "When do I use degrees vs radians?", answer: "Degrees are more intuitive for everyday angles. Radians are the standard in math and programming. Always check which mode your calculator uses." },
      { question: "Are my trigonometric calculations private?", answer: "Yes, all calculations happen in your browser. Nothing is stored or transmitted to any server." },
    ],
  },
  "right-triangle": {
    howTo: {
      title: "How to Calculate Right Triangle Values",
      steps: [
        "Enter any two known values (sides or angles)",
        "The calculator solves for all remaining values",
        "View side lengths, angles, and area/perimeter",
        "Use for construction, navigation, and physics problems",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Solve any right triangle with minimal inputs",
        "Calculate area and perimeter instantly",
        "Find angles using trigonometric relationships",
        "Pythagorean theorem verification",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Pythagorean theorem: a² + b² = c² for all right triangles",
        "The sum of angles in any triangle is always 180°",
        "Essential for construction, land surveying, and engineering",
      ],
    },
    faq: [
      { question: "What information do I need to solve a right triangle?", answer: "You need any two of: one side and one non-right angle, two sides, or a side and the hypotenuse. The calculator finds all remaining values." },
      { question: "Why is the Pythagorean theorem important?", answer: "It relates the three sides of any right triangle. If you know two sides, you can always find the third using a² + b² = c²." },
      { question: "Is my construction data kept secure?", answer: "Absolutely. All triangle calculations happen in your browser without any storage or transmission to servers." },
    ],
  },
  "circle-calculator": {
    howTo: {
      title: "How to Calculate Circle Properties",
      steps: [
        "Enter the radius or diameter of the circle",
        "Optionally enter the circumference or area if known",
        "The calculator computes all circle properties",
        "View area, circumference, and diameter",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate area from radius, diameter, or circumference",
        "Find circumference and arc length",
        "Compute sector area and segment calculations",
        "Support for pi and exact values",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Circumference = 2πr and Area = πr² are fundamental circle formulas",
        "Useful for design, manufacturing, and geometry problems",
        "Arc length calculations help in engineering and construction",
      ],
    },
    faq: [
      { question: "What's the difference between radius and diameter?", answer: "Radius is the distance from center to edge. Diameter is twice the radius, spanning the full width through the center." },
      { question: "Why is pi (π) so important in circle calculations?", answer: "Pi is the ratio of circumference to diameter for any circle. It's approximately 3.14159 but is irrational (infinite decimal places)." },
      { question: "Is my design data completely private?", answer: "Yes, all circle calculations happen in your browser. Your measurements are never stored or transmitted to any server." },
    ],
  },
  "compound-interest": {
    howTo: {
      title: "Как вычислить сложные проценты",
      steps: [
        "Enter principal amount (initial investment)",
        "Input annual interest rate and compounding frequency",
        "Enter the time period in years",
        "View final amount and interest earned",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate compound interest with various frequencies (daily, monthly, quarterly, annually)",
        "Compare different compounding schedules",
        "View interest earned breakdown",
        "Project long-term investment growth",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "More frequent compounding results in higher returns",
        "Compound interest is the most important factor in long-term wealth building",
        "Even small rates accumulate significantly over decades",
      ],
    },
    faq: [
      { question: "How does daily compounding differ from annual compounding?", answer: "Daily compounding calculates interest 365 times per year, while annual does it once. More frequent compounding yields slightly higher returns." },
      { question: "What's the impact of time on compound interest?", answer: "Time is critical. Money left invested for 30 years grows far more than 10 years due to compound growth. Start investing early!" },
      { question: "Will my financial information remain private?", answer: "Yes, all compound interest calculations happen in your browser. Your investment data is never stored or transmitted." },
    ],
  },
  "loan-calculator": {
    howTo: {
      title: "Как вычислить платёж по кредитуs",
      steps: [
        "Enter the loan amount you want to borrow",
        "Input the annual interest rate",
        "Enter the loan term in months or years",
        "View monthly payment and total interest cost",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate monthly, quarterly, or custom payment periods",
        "View full amortization schedule",
        "Compare different loan terms and rates",
        "Show total interest paid over loan lifetime",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Shorter loan terms cost less interest but have higher payments",
        "Even small interest rate differences add up significantly",
        "Use to compare offers from different lenders",
      ],
    },
    faq: [
      { question: "Should I choose a shorter or longer loan term?", answer: "Shorter terms cost less total interest but have higher monthly payments. Balance monthly affordability with total interest paid." },
      { question: "What does an amortization schedule show?", answer: "It breaks down each payment showing how much goes to principal vs interest. Early payments are mostly interest; later ones mostly principal." },
      { question: "Is my loan comparison information stored?", answer: "No, all calculations happen locally in your browser without storage or transmission to any server." },
    ],
  },
  "mortgage-calculator": {
    howTo: {
      title: "Как вычислить ипотеку Payments",
      steps: [
        "Enter the home price and down payment amount",
        "Input the loan term (15, 20, or 30 years) and interest rate",
        "Add property tax, insurance, and HOA costs",
        "View total monthly payment and amortization schedule",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate principal and interest payments",
        "Include property tax, insurance, and PMI in monthly payment",
        "Show amortization schedule with principal/interest breakdown",
        "Compare different down payment amounts and loan terms",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "20% down payment avoids PMI (private mortgage insurance)",
        "Lower interest rates significantly reduce total cost over 30 years",
        "Use to determine affordable home price based on income",
      ],
    },
    faq: [
      { question: "What does PMI stand for and why do I need it?", answer: "PMI (Private Mortgage Insurance) protects lenders if you default. If your down payment is less than 20%, lenders require it." },
      { question: "Is a 15-year or 30-year mortgage better?", answer: "30-year mortgages have lower monthly payments but more total interest. 15-year mortgages cost less overall but require higher payments." },
      { question: "Are my home purchase details kept private?", answer: "Yes, all calculations happen locally in your browser. Your financial information is never stored or transmitted." },
    ],
  },
  "savings-goal": {
    howTo: {
      title: "How to Calculate Savings Goals",
      steps: [
        "Enter your target savings amount",
        "Input the time period to reach the goal",
        "Enter expected interest rate or investment return",
        "View required monthly/yearly savings amount",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate required savings for any financial goal",
        "Show impact of different interest rates",
        "Project wealth accumulation over time",
        "Compare lump sum vs. regular contributions",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Starting early allows smaller contributions to reach same goal",
        "Interest and investment returns significantly accelerate progress",
        "Breaking large goals into monthly targets makes them achievable",
      ],
    },
    faq: [
      { question: "How much difference does starting early make?", answer: "Starting 10 years earlier means you could reach the same goal with less than half the monthly savings due to compound interest." },
      { question: "What interest rate should I assume?", answer: "Use conservative estimates: savings accounts ~4%, bonds ~5%, stocks ~8%. Higher returns require more risk." },
      { question: "Will my savings goals remain confidential?", answer: "Absolutely. All calculations happen in your browser without any storage or transmission of your financial goals." },
    ],
  },
  "roi-calculator": {
    howTo: {
      title: "How to Calculate Return on Investment",
      steps: [
        "Enter the initial investment amount",
        "Input the current or final value of the investment",
        "Specify the time period of the investment",
        "View ROI percentage and annualized return",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate return on investment as percentage",
        "Annualize returns for fair comparison across timeframes",
        "Compare multiple investments side-by-side",
        "Adjust for inflation to find real returns",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Always compare ROI for investments of similar risk levels",
        "Annualized return allows fair comparison of different time periods",
        "Consider fees and taxes when calculating true ROI",
      ],
    },
    faq: [
      { question: "What's the difference between ROI and annualized return?", answer: "ROI is total return over the entire period. Annualized return shows average yearly return, making investments of different lengths comparable." },
      { question: "How do fees and taxes affect ROI?", answer: "Both reduce your net return. If you earn 10% but pay 2% in fees and 3% in taxes, your true ROI is about 5%." },
      { question: "Is my investment data kept confidential?", answer: "Yes, all ROI calculations happen locally in your browser. Your investment information is never stored or transmitted." },
    ],
  },
  "profit-margin": {
    howTo: {
      title: "How to Calculate Profit Margin",
      steps: [
        "Enter revenue or selling price",
        "Input the cost of goods/services sold",
        "The calculator computes profit margin percentage",
        "View gross and net profit metrics",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate gross profit margin percentage",
        "Determine required profit for target margin",
        "Compare profit margins across products",
        "Show profit amount and breakdown",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Higher profit margins indicate better pricing power and efficiency",
        "Different industries have different normal margin ranges",
        "Use to identify which products or services are most profitable",
      ],
    },
    faq: [
      { question: "What's a healthy profit margin?", answer: "It varies by industry: retail averages 2-5%, software 50-80%, services 20-40%. Compare your margin to industry standards." },
      { question: "Can profit margin be negative?", answer: "Yes, if your costs exceed revenue, you have negative profit margin and are losing money on that product or service." },
      { question: "Is my business data stored anywhere?", answer: "No, all profit margin calculations happen in your browser. Your business information is never stored or transmitted." },
    ],
  },
  "markup-calculator": {
    howTo: {
      title: "How to Calculate Markup",
      steps: [
        "Enter the cost price of the item or service",
        "Input the desired markup percentage",
        "The calculator determines the selling price",
        "View profit amount and profit margin",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate selling price from cost and markup",
        "Convert between markup and margin percentages",
        "Determine required markup for profit goals",
        "Batch calculate multiple items",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Markup is calculated on cost; margin is calculated on price",
        "Same margin requires higher markup at lower price points",
        "Use industry standards as benchmarks for pricing",
      ],
    },
    faq: [
      { question: "Why is markup different from margin?", answer: "Markup is calculated on cost (profit ÷ cost). Margin is calculated on selling price (profit ÷ price). A 50% markup yields about 33% margin." },
      { question: "How do I decide what markup to use?", answer: "Consider costs, competition, demand, and industry standards. Test different markups to find optimal balance between profit and sales volume." },
      { question: "Will my pricing strategy be kept private?", answer: "Yes, all calculations happen in your browser. Your pricing data is never stored or transmitted to any server." },
    ],
  },
  "break-even": {
    howTo: {
      title: "Как вычислить точку безубыточности Point",
      steps: [
        "Enter total fixed costs (rent, salaries, equipment)",
        "Input the selling price per unit",
        "Enter variable cost per unit",
        "View units and revenue needed to break even",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate units needed to break even",
        "Determine break-even revenue amount",
        "Analyze profit at different sales volumes",
        "Visualize break-even with charts and graphs",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Break-even is where total revenue equals total costs",
        "Lower fixed costs or higher margins reduce break-even point",
        "Essential for business planning and investment decisions",
      ],
    },
    faq: [
      { question: "Why is break-even analysis important?", answer: "It shows the minimum sales needed to cover costs. Below this point you lose money; above it you profit. Essential for business viability decisions." },
      { question: "How does changing fixed costs affect break-even?", answer: "Higher fixed costs increase the break-even point. Even a 10% increase in rent or salaries can significantly raise units needed." },
      { question: "Is my business planning data stored securely?", answer: "Yes, all break-even calculations happen locally in your browser without storage or transmission to any server." },
    ],
  },
  "depreciation": {
    howTo: {
      title: "How to Calculate Depreciation",
      steps: [
        "Enter the original asset cost",
        "Input the useful life in years and salvage value",
        "Choose depreciation method (straight-line, declining-balance)",
        "View annual depreciation and asset value over time",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate depreciation using multiple methods",
        "Track asset value year-by-year",
        "Show tax deduction impacts",
        "Compare depreciation methods side-by-side",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Straight-line depreciation is the simplest and most common method",
        "Accelerated depreciation methods reduce taxable income earlier",
        "Important for business financial statements and tax planning",
      ],
    },
    faq: [
      { question: "What does useful life mean in depreciation?", answer: "Useful life is how long you expect the asset to remain productive. Different assets have standard useful lives: cars 5 years, buildings 39 years, etc." },
      { question: "Why does depreciation method matter for taxes?", answer: "Different methods create different tax deductions each year. Accelerated methods reduce taxes faster early on, improving cash flow." },
      { question: "Are my asset records kept confidential?", answer: "Absolutely. All depreciation calculations happen in your browser without any storage or transmission of your business information." },
    ],
  },
  "sales-tax": {
    howTo: {
      title: "How to Calculate Sales Tax",
      steps: [
        "Enter the original price before tax",
        "Input the sales tax rate for your location",
        "The calculator computes total price with tax",
        "View tax amount and after-tax total",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate sales tax for any jurisdiction",
        "Find pre-tax price when you know final amount",
        "Calculate tax on bulk purchases",
        "Support for multiple tax rates",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Sales tax rates vary significantly by state and locality",
        "Some items may be exempt from sales tax",
        "Include in budget calculations for accurate spending estimates",
      ],
    },
    faq: [
      { question: "Why do sales tax rates vary so much?", answer: "States, counties, and cities all add their own sales tax. Some locations have no sales tax, while others reach 10% or higher." },
      { question: "Are certain items exempt from sales tax?", answer: "Yes, groceries are typically exempt in most states. Some states exempt clothing, medicine, and other essentials depending on local laws." },
      { question: "Will my shopping calculations be stored?", answer: "No, all sales tax calculations happen in your browser. Your shopping information is never stored or transmitted." },
    ],
  },
  "bmi-calculator": {
    howTo: {
      title: "Как вычислить ИМТ",
      steps: [
        "Enter your weight in kilograms or pounds",
        "Input your height in centimeters or inches",
        "The calculator computes your BMI instantly",
        "View health category and recommendations",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate BMI from weight and height measurements",
        "Support metric and imperial units",
        "Display health category (underweight, normal, overweight, obese)",
        "Show ideal weight range for your height",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "BMI is a screening tool; it doesn't account for muscle mass or bone density",
        "Normal BMI range is 18.5 to 24.9",
        "Combine with other health metrics for complete assessment",
      ],
    },
    faq: [
      { question: "Is BMI accurate for athletes?", answer: "BMI can overestimate body fat for muscular individuals. For athletes, body fat percentage or waist-to-hip ratio may be more accurate." },
      { question: "What does each BMI category mean?", answer: "Below 18.5 is underweight, 18.5-24.9 is normal, 25-29.9 is overweight, 30+ is obese. These are general guidelines, not medical diagnoses." },
      { question: "Will my health data be stored?", answer: "No, all calculations happen in your browser. Your weight and health information are never stored or transmitted." },
    ],
  },
  "bmr-calculator": {
    howTo: {
      title: "How to Calculate BMR",
      steps: [
        "Enter your age, gender, height, and weight",
        "The calculator computes your Basal Metabolic Rate",
        "View calories burned at rest daily",
        "Use to plan diet and exercise programs",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate BMR using Harris-Benedict or Mifflin-St Jeor equations",
        "Show calories burned at different activity levels",
        "Determine calorie needs for weight goals",
        "Track metabolic changes over time",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Men typically have higher BMR than women due to more muscle mass",
        "Muscle tissue burns more calories at rest than fat tissue",
        "Moderate strength training can increase BMR",
      ],
    },
    faq: [
      { question: "Does BMR change with age?", answer: "Yes, BMR decreases about 2% per decade after age 30. This is why maintaining muscle through exercise becomes more important as you age." },
      { question: "How is BMR different from TDEE?", answer: "BMR is calories burned at complete rest. TDEE adds activity level on top. TDEE is more useful for diet planning." },
      { question: "Is my health data kept confidential?", answer: "Yes, all BMR calculations happen in your browser. Your personal health data is never stored or transmitted." },
    ],
  },
  "tdee-calculator": {
    howTo: {
      title: "Как вычислить TDEE",
      steps: [
        "Enter your BMR (or let the calculator derive from your stats)",
        "Select your activity level (sedentary, light, moderate, active, very active)",
        "The calculator multiplies BMR by activity factor",
        "View total daily energy expenditure",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate total daily energy expenditure from activity level",
        "Determine calorie deficit for weight loss goals",
        "Show calorie surplus for muscle gain",
        "Track different activity scenarios",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "500-calorie daily deficit results in about 0.5 kg weight loss per week",
        "TDEE varies significantly based on exercise frequency",
        "Adjust gradually and monitor results rather than drastic changes",
      ],
    },
    faq: [
      { question: "What's the best deficit for weight loss?", answer: "A 300-500 calorie daily deficit is sustainable and safe. Larger deficits risk muscle loss and are harder to maintain." },
      { question: "How does cardio vs strength training affect TDEE?", answer: "Both increase TDEE, but strength training builds muscle which increases BMR. This creates lasting metabolic benefits." },
      { question: "Will my fitness data remain private?", answer: "Yes, all TDEE calculations happen in your browser. Your fitness information is never stored or transmitted." },
    ],
  },
  "calorie-calculator": {
    howTo: {
      title: "How to Calculate Calorie Burn",
      steps: [
        "Select your activity type and intensity",
        "Enter duration in minutes",
        "Input your body weight",
        "View total calories burned during activity",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate calories burned for 100+ different activities",
        "Account for body weight and intensity variations",
        "Track calories burned over multiple activities",
        "Compare calorie burn across different exercises",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Heavier individuals burn more calories doing the same activity",
        "High-intensity interval training burns calories more efficiently",
        "Combine with dietary changes for best weight management results",
      ],
    },
    faq: [
      { question: "Which exercises burn the most calories?", answer: "Running, swimming, and HIIT burn the most per hour. However, sustained moderate activity is often more practical and sustainable." },
      { question: "Do these estimates account for individual differences?", answer: "The calculator accounts for weight and duration, but factors like fitness level, age, and metabolism create individual variations of ±20%." },
      { question: "Is my workout data stored anywhere?", answer: "No, all calorie calculations happen in your browser. Your workout information is never stored or transmitted." },
    ],
  },
  "body-fat": {
    howTo: {
      title: "How to Calculate Body Fat Percentage",
      steps: [
        "Measure body circumferences (neck, waist, hips)",
        "Input measurements along with height and gender",
        "The calculator estimates body fat percentage",
        "View recommendations for your fitness level",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate body fat using circumference measurements",
        "Support multiple calculation methods",
        "Show healthy body fat ranges by age and gender",
        "Track progress over time",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Healthy body fat range varies by age and gender",
        "Athletes typically have lower body fat percentages",
        "Build muscle while reducing fat for optimal body composition",
      ],
    },
    faq: [
      { question: "What's a healthy body fat percentage?", answer: "For men: 10-20% is fit, 20-25% is acceptable. For women: 18-25% is fit, 25-32% is acceptable. Essential fat is 2-5% for men, 10-13% for women." },
      { question: "Is body fat percentage more accurate than BMI?", answer: "Yes, body fat percentage accounts for muscle vs fat. Someone can have high BMI from muscle but low body fat percentage." },
      { question: "Are my measurements kept confidential?", answer: "Yes, all body fat calculations happen in your browser. Your measurements are never stored or transmitted." },
    ],
  },
  "ideal-weight": {
    howTo: {
      title: "How to Calculate Ideal Weight",
      steps: [
        "Enter your height in centimeters or inches",
        "Input your body frame size (small, medium, large)",
        "Select your gender",
        "View ideal weight range and recommendations",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate ideal weight using multiple formulas",
        "Account for body frame size variations",
        "Show weight ranges for different health goals",
        "Include BMI categories in results",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Ideal weight varies based on muscle and bone structure",
        "Focus on health rather than reaching arbitrary numbers",
        "Maintain realistic goals aligned with your body type",
      ],
    },
    faq: [
      { question: "How do I know my body frame size?", answer: "Measure your wrist circumference or compare elbow width. Small frame is narrow, large frame is wider. Most people are medium frame." },
      { question: "Can ideal weight change over time?", answer: "As you age and gain muscle, your ideal weight may change. Fitness goals also affect target weight. Re-evaluate periodically." },
      { question: "Is my weight data stored anywhere?", answer: "No, all calculations happen in your browser. Your weight information is never stored or transmitted to any server." },
    ],
  },
  "heart-rate-zone": {
    howTo: {
      title: "How to Calculate Heart Rate Zones",
      steps: [
        "Enter your age and resting heart rate",
        "Select your preferred calculation method (Karvonen or percentage)",
        "The calculator determines your training zones",
        "Use zones to guide workout intensity",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate five training zones (warm-up, aerobic, tempo, threshold, VO2 max)",
        "Karvonen and percentage of max HR methods",
        "Show target heart rate ranges for each zone",
        "Guide workouts by intensity level",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Aerobic zone (zone 2) is best for building base fitness",
        "High-intensity zones should be used sparingly to avoid overtraining",
        "Monitor heart rate during exercise for optimal training",
      ],
    },
    faq: [
      { question: "What's a normal resting heart rate?", answer: "Normal resting heart rate is 60-100 bpm. Athletes often have lower rates (40-60 bpm). Lower resting HR generally indicates better fitness." },
      { question: "Which zone should I train in most?", answer: "Zone 2 (aerobic) is best for base fitness and should be 70-80% of training. Higher zones are for specific fitness goals and recovery." },
      { question: "Is my heart rate data kept private?", answer: "Yes, all calculations happen in your browser. Your heart rate information is never stored or transmitted." },
    ],
  },
  "macro-calculator": {
    howTo: {
      title: "How to Calculate Macros",
      steps: [
        "Enter your daily calorie goal",
        "Select your diet type (balanced, low-carb, high-protein, etc.)",
        "The calculator distributes calories across macronutrients",
        "View grams of protein, carbs, and fats needed daily",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate macronutrient distribution for any calorie goal",
        "Support popular diet ratios (40/40/20, 50/30/20, etc.)",
        "Convert between grams and calories",
        "Track micros alongside macros",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Protein is essential for muscle building and recovery",
        "Most people benefit from higher protein intakes (1.6-2.2g per kg)",
        "Carbs fuel high-intensity workouts while fats support hormones",
      ],
    },
    faq: [
      { question: "How do I calculate protein needs?", answer: "Standard: 0.8g per kg for sedentary. Active: 1.2-1.6g per kg. Muscle building: 1.6-2.2g per kg of body weight." },
      { question: "Is low-carb or balanced diet better?", answer: "Both work for weight loss. Low-carb is easier for some; balanced is more sustainable for others. Choose based on what you can maintain." },
      { question: "Will my diet information remain private?", answer: "Yes, all macro calculations happen in your browser. Your dietary information is never stored or transmitted." },
    ],
  },
  "tip-calculator": {
    howTo: {
      title: "How to Calculate Советы по использованию",
      steps: [
        "Enter the total bill amount",
        "Select or input the tip percentage",
        "The calculator computes tip and total amount",
        "View split bills for multiple people if needed",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate tip percentage instantly",
        "Show tip amount and total bill with tip",
        "Split bill among multiple people",
        "Preset common tip percentages (15%, 18%, 20%)",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Standard tipping is 15-20% of pre-tax bill in the US",
        "Quality service and dining experience justify higher percentages",
        "Consider rounding for easier payment in cash transactions",
      ],
    },
    faq: [
      { question: "Should I tip on the pre-tax or post-tax bill?", answer: "In the US, standard practice is to tip on pre-tax bill. However, tipping on post-tax is also acceptable and slightly generous." },
      { question: "What's appropriate tipping at different venues?", answer: "Restaurants: 15-20%, Bars: $1-2 per drink, Delivery: 15-18%, Hair salon: 15-20%, Hotel staff: $1-5 per night." },
      { question: "Is my bill information stored?", answer: "No, all tip calculations happen in your browser. Your bill information is never stored or transmitted." },
    ],
  },
  "electricity-cost": {
    howTo: {
      title: "How to Calculate Electricity Cost",
      steps: [
        "Enter the appliance power consumption in watts",
        "Input daily usage hours or monthly hours",
        "Enter your electricity rate per kilowatt-hour",
        "View daily, monthly, and annual costs",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate electricity cost for any appliance",
        "Show energy consumption in kilowatt-hours",
        "Compare costs across different appliances",
        "Estimate annual expenses and savings opportunities",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Air conditioning and heating are typically the largest energy users",
        "LED bulbs use 75% less energy than incandescent bulbs",
        "Unplugging devices reduces phantom energy drain",
      ],
    },
    faq: [
      { question: "How do I find my appliance's wattage?", answer: "Check the label on the back or bottom of the appliance, or search the model number online. Typical ranges: refrigerator 150-800W, AC 3000-5000W." },
      { question: "What's phantom power drain?", answer: "Devices use power even when off if plugged in. Reduce phantom drain by unplugging devices or using power strips you can turn off." },
      { question: "Will my utility information be kept private?", answer: "Yes, all electricity cost calculations happen in your browser. Your utility information is never stored or transmitted." },
    ],
  },
  "fuel-cost": {
    howTo: {
      title: "How to Calculate Fuel Cost",
      steps: [
        "Enter distance to be traveled in miles or kilometers",
        "Input your vehicle's fuel consumption rate (MPG or L/100km)",
        "Enter fuel price per unit",
        "View total fuel cost for the trip",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate fuel cost for any distance",
        "Support multiple fuel consumption metrics",
        "Account for different fuel prices",
        "Compare fuel costs across different vehicles",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Proper tire pressure and maintenance improve fuel efficiency",
        "Highway driving is generally more efficient than city driving",
        "Smooth acceleration and avoiding excessive idling saves fuel",
      ],
    },
    faq: [
      { question: "How do I find my vehicle's fuel consumption?", answer: "Check your owner's manual, window sticker, or EPA website. Modern cars also display it on the dashboard or in the trip computer." },
      { question: "Does driving style really affect fuel efficiency?", answer: "Yes, smooth acceleration and coasting can improve efficiency by 10-20%. Aggressive driving and idling significantly waste fuel." },
      { question: "Is my trip data stored anywhere?", answer: "No, all fuel cost calculations happen in your browser. Your trip information is never stored or transmitted." },
    ],
  },
  "paint-calculator": {
    howTo: {
      title: "How to Calculate Paint Needed",
      steps: [
        "Measure room dimensions (length, width, height)",
        "Account for door and window areas",
        "Input paint coverage per gallon",
        "View gallons needed and estimated cost",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate coverage for walls, ceiling, or entire room",
        "Account for multiple coats and room dimensions",
        "Subtract door and window areas accurately",
        "Estimate paint cost with bulk pricing",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Most paint covers 350 square feet per gallon",
        "Primer is important for new drywall and color changes",
        "Always buy 10-15% extra for touch-ups and variations",
      ],
    },
    faq: [
      { question: "How many coats of paint do I need?", answer: "Most projects need 2 coats for good coverage. New drywall or dark-to-light color changes may need a primer plus 2 coats." },
      { question: "Does textured wall coverage differ from smooth?", answer: "Yes, textured walls need about 25% more paint. Primer coverage is similar, but paint consumption increases due to surface area." },
      { question: "Is my project information stored?", answer: "No, all paint calculations happen in your browser. Your project information is never stored or transmitted." },
    ],
  },
  "concrete-calculator": {
    howTo: {
      title: "How to Calculate Concrete Needed",
      steps: [
        "Measure area length and width in feet or meters",
        "Enter desired concrete thickness (typically 4 inches)",
        "The calculator converts to cubic yards or cubic meters",
        "View concrete amount needed and estimated cost",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate concrete volume for slabs and foundations",
        "Convert between cubic feet, yards, and meters",
        "Account for various thickness requirements",
        "Estimate material and delivery costs",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Standard concrete thickness for driveways is 4 inches",
        "Order 5-10% extra to account for spillage and variation",
        "Concrete cures stronger over time; don't stress immediately",
      ],
    },
    faq: [
      { question: "Why do I need 4 inches of concrete for driveways?", answer: "4 inches is standard for residential driveways. It provides adequate strength for vehicle weight and flexibility for freeze-thaw cycles." },
      { question: "How long does concrete take to cure?", answer: "Concrete reaches 80% strength in 7 days, 95% in 28 days. Full strength develops over a year, but it's usable after 1-2 weeks." },
      { question: "Will my project measurements be stored?", answer: "No, all calculations happen in your browser. Your project information is never stored or transmitted." },
    ],
  },
  "tile-calculator": {
    howTo: {
      title: "How to Calculate Tiles Needed",
      steps: [
        "Measure total area to be tiled (length x width)",
        "Input tile dimensions (length x width)",
        "Account for grout lines if using variable joints",
        "View number of tiles and boxes needed",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate tile quantities for walls and floors",
        "Account for grout line thickness variations",
        "Show coverage area per box or tile",
        "Estimate material costs and labor",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Always order 10% extra tiles for breakage and future repairs",
        "Larger tiles make spaces appear bigger",
        "Grout color significantly impacts the final appearance",
      ],
    },
    faq: [
      { question: "How much extra should I buy for breakage?", answer: "Order 10% extra for standard projects, 15% for complex patterns or irregular areas. Stores may not have the exact batch later." },
      { question: "Do grout lines affect how many tiles I need?", answer: "Yes, larger grout lines increase waste slightly. Standard grout line is 3-6mm. This calculator accounts for it when specified." },
      { question: "Is my tiling project information stored?", answer: "No, all calculations happen in your browser. Your project information is never stored or transmitted." },
    ],
  },
  "random-number": {
    howTo: {
      title: "How to Generate Random Numbers",
      steps: [
        "Set the minimum and maximum range values",
        "Choose whether you want integers or decimals",
        "Specify how many random numbers to generate",
        "Generate and copy results instantly",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Generate truly random numbers in any range",
        "Support for integers and decimal numbers",
        "Batch generate multiple random values",
        "Remove duplicates or allow repetition",
        "Sort results in ascending or descending order",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Useful for games, lotteries, sampling, and testing",
        "Random selection removes bias in decision-making",
        "Seed numbers ensure reproducible randomness for testing",
      ],
    },
    faq: [
      { question: "How random are these numbers really?", answer: "These use your browser's cryptographic random generator, suitable for most purposes. For security-critical applications, consult specialists." },
      { question: "Can I generate duplicates or only unique numbers?", answer: "You can choose either. Unique random numbers are useful for sampling; allowing duplicates is better for simulations." },
      { question: "Are my random numbers stored anywhere?", answer: "No, all number generation happens in your browser. Nothing is stored or transmitted to any server." },
    ],
  },
  "gpa-calculator": {
    howTo: {
      title: "Как вычислить GPA",
      steps: [
        "Enter course name and letter grade (A, B, C, etc.)",
        "Input credit hours for each course",
        "The calculator converts to GPA scale (4.0, 5.0)",
        "View cumulative GPA and weighted average",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate GPA on 4.0 or 5.0 scale",
        "Account for variable credit hours per course",
        "Show weighted average of all courses",
        "Track GPA by semester or year",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "GPA is crucial for scholarships and graduate school admissions",
        "A single low grade significantly impacts overall GPA",
        "Retaking courses can improve GPA if new grade is higher",
      ],
    },
    faq: [
      { question: "How do colleges use GPA?", answer: "GPA is used for admissions, scholarships, academic standing, and honors. Most competitive schools look for 3.5+ GPA." },
      { question: "If I retake a course, does the old grade count?", answer: "Policies vary. Some schools use the highest grade, others average both. Check your school's retake policy." },
      { question: "Will my grades and GPA be stored?", answer: "No, all calculations happen in your browser. Your academic information is never stored or transmitted." },
    ],
  },
  "grade-calculator": {
    howTo: {
      title: "How to Calculate Final Grade",
      steps: [
        "Enter assignment categories (tests, projects, participation)",
        "Input weight percentage for each category",
        "Enter current grades in each category",
        "View calculated final grade and needed grades",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate weighted final grade from component grades",
        "Determine grade needed to reach target final grade",
        "Support unlimited assignment categories",
        "Show grade distribution and breakdown",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Understand the weight of each assignment before the semester ends",
        "Focus effort on high-weight assignments for maximum impact",
        "Extra credit opportunities can offset low grades",
      ],
    },
    faq: [
      { question: "How do weighted grades work?", answer: "Each category's grade is multiplied by its weight percentage, then all are summed. A 90 in a 40% category counts more than a 90 in a 10% category." },
      { question: "Can I see what grade I need on upcoming assignments?", answer: "Yes, enter your target final grade and current grades. The calculator shows exactly what you need to reach your goal." },
      { question: "Will my grades be stored anywhere?", answer: "No, all calculations happen in your browser. Your grades are never stored or transmitted." },
    ],
  },
  "final-exam": {
    howTo: {
      title: "How to Calculate Needed Final Exam Grade",
      steps: [
        "Enter your current course grade",
        "Input the weight of the final exam (typically 15-30%)",
        "Enter your target final grade",
        "View the grade needed on the final exam",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate exact grade needed to achieve target",
        "Show impact of different final exam scores",
        "Display scenarios for different exam weights",
        "Determine if target is mathematically possible",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Final exam often has significant weight in course grade",
        "Focus on areas of weakness before the final",
        "Sometimes settling for a B is more realistic than striving for impossible A",
      ],
    },
    faq: [
      { question: "Is it possible that I can't reach my target grade?", answer: "Yes, if the gap is too large. The calculator will show if your target is mathematically impossible based on the exam weight." },
      { question: "How much does the final exam usually affect my grade?", answer: "Typically 15-30%. Some courses make it 50%. Always confirm with your syllabus or instructor." },
      { question: "Are my academic calculations stored?", answer: "No, all calculations happen in your browser. Your academic information is never stored or transmitted." },
    ],
  },
  "weighted-average": {
    howTo: {
      title: "How to Calculate Weighted Average",
      steps: [
        "Enter values and their corresponding weights",
        "Ensure weights sum to 100% or normalize automatically",
        "The calculator computes the weighted average",
        "View results and weight distribution",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate weighted average for any dataset",
        "Auto-normalize weights if they don't sum to 100%",
        "Show individual contributions to final average",
        "Support unlimited value-weight pairs",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Weighted average shows true average when items have different importance",
        "Used in GPA, student grades, portfolio returns, and quality metrics",
        "Weights must total 100% for accurate results",
      ],
    },
    faq: [
      { question: "When should I use weighted average vs simple average?", answer: "Use weighted average when items have different importance levels. Simple average treats all items equally." },
      { question: "What happens if my weights don't sum to 100%?", answer: "The calculator can auto-normalize weights if enabled, or you can adjust them manually to ensure accuracy." },
      { question: "Will my calculation data be stored?", answer: "No, all weighted average calculations happen in your browser. Your data is never stored or transmitted." },
    ],
  },
  "bitwise-calculator": {
    howTo: {
      title: "How to Calculate Bitwise Operations",
      steps: [
        "Enter numbers in decimal, binary, or hexadecimal",
        "Select the bitwise operation (AND, OR, XOR, NOT)",
        "The calculator performs the operation instantly",
        "View results in multiple number formats",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Perform AND, OR, XOR, NOT, left shift, right shift operations",
        "Support decimal, binary, and hexadecimal number formats",
        "Show results in all number systems",
        "Bit-by-bit operation visualization",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Bitwise operations are fundamental in computer programming",
        "Left shift multiplies by 2; right shift divides by 2",
        "Used in networking, graphics, cryptography, and systems programming",
      ],
    },
    faq: [
      { question: "What's the difference between AND, OR, and XOR?", answer: "AND returns 1 only if both bits are 1. OR returns 1 if at least one bit is 1. XOR returns 1 if bits differ." },
      { question: "Why are bitwise operations important in programming?", answer: "They're fast at the CPU level, used for flags, masks, compression, and low-level manipulation in systems and embedded code." },
      { question: "Are my bitwise calculations stored anywhere?", answer: "No, all calculations happen in your browser. Your operations are never stored or transmitted." },
    ],
  },
  "subnet-calculator": {
    howTo: {
      title: "How to Calculate Subnets",
      steps: [
        "Enter IP address and subnet mask or CIDR notation",
        "The calculator determines network boundaries",
        "View usable host range and network information",
        "Get subnet details for network planning",
      ],
    },
    features: {
      title: "Основные функции",
      items: [
        "Calculate network address and broadcast address",
        "Determine usable IP range for hosts",
        "Support both decimal and CIDR notation",
        "Show subnet masks and network sizing",
      ],
    },
    tips: {
      title: "Советы по использованию",
      items: [
        "Subnetting allows efficient IP address allocation",
        "First IP is network address; last is broadcast address",
        "Essential for network administration and infrastructure planning",
      ],
    },
    faq: [
      { question: "What does CIDR notation mean?", answer: "CIDR (/24, /25, etc.) represents the number of bits in the subnet mask. /24 means first 24 bits are network, last 8 bits for hosts." },
      { question: "How many usable IPs are in a subnet?", answer: "Total IPs minus 2 (network and broadcast addresses). A /24 subnet has 256 total IPs but only 254 usable for hosts." },
      { question: "Will my network information be stored?", answer: "No, all subnet calculations happen in your browser. Your network information is never stored or transmitted." },
    ],
  },
};
