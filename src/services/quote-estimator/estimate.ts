import type { QuoteEstimatorInput } from '../../types/fiberion';

export function estimateQuoteRange(input: QuoteEstimatorInput) {
  const baseRate = input.customerType === 'commercial' ? 0.28 : 0.42;
  const stainMultiplier = input.stainLevel === 'heavy' ? 1.35 : input.stainLevel === 'moderate' ? 1.18 : 1;
  const odorFee = input.odorTreatment ? 85 : 0;
  const stairsFee = input.stairs ? 65 : 0;
  const urgencyMultiplier = input.urgency === 'rush' ? 1.22 : input.urgency === 'after_hours' ? 1.3 : 1;
  const roomFloor = input.roomCount * 55;
  const raw = Math.max(input.squareFootage * baseRate, roomFloor);
  const estimated = (raw * stainMultiplier + odorFee + stairsFee) * urgencyMultiplier;

  return {
    low: Math.round(estimated * 0.9),
    high: Math.round(estimated * 1.18)
  };
}
