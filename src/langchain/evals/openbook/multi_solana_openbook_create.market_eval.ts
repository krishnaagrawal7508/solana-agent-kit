import { runComplexEval, ComplexEvalDataset } from "../utils/runEvals";

const DATASET: ComplexEvalDataset[] = [
  {
    description: "Multi-turn openbook market creation",
    inputs: {
      query: "I need to create a new openbook market",
    },
    turns: [
      {
        input: "I need to create a new openbook market",
        expectedResponse: "Sure, what would be the base mint?",
      },
      {
        input: "Let’s use SOL as the base mint",
        expectedResponse:
          "Got it, SOL is the base mint. What about the quote mint?",
      },
      {
        input: "And USDC as the quote mint",
        expectedResponse: "USDC as the quote mint. Any lot size or tick size?",
      },
      {
        input: "Set the lot size to 100 and tick size to 1.5",
        expectedToolCall: {
          tool: "solana_openbook_create_market",
          params: {
            baseMint: "So11111111111111111111111111111111111111112",
            quoteMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            lotSize: 100,
            tickSize: 1.5,
          },
        },
      },
    ],
  },
];

runComplexEval(DATASET, "Multi-turn solana_openbook_create_market test");
