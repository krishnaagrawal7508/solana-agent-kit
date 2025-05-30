export * from "./adrena";
export * from "./alldomains";
export * from "./dexscreener";
export * from "./alldomains";
export * from "./flash";
export * from "./gibwork";
export * from "./jupiter";
export * from "./lulo";
export * from "./manifest";
export * from "./solana";
export * from "./agent";
export * from "./metaplex";
export * from "./openbook";
export * from "./orca";
export * from "./pumpfun";
export * from "./pyth";
export * from "./raydium";
export * from "./rugcheck";
export * from "./sendarcade";
export * from "./solayer";
export * from "./tensor";
export * from "./3land";
export * from "./tiplink";
export * from "./sns";
export * from "./lightprotocol";
export * from "./squads";
export * from "./meteora";
export * from "./helius";
export * from "./drift";
export * from "./voltr";
export * from "./mayan";
export * from "./allora";
export * from "./solutiofi";
export * from "./switchboard";
export * from "./elfa_ai";
export * from "./debridge";
export * from "./fluxbeam";
export * from "./wormhole";
export * from "./okx-dex";
export * from "./solanafm";
export * from "./sanctum";

import type { SolanaAgentKit } from "../agent";
import {
  SolanaBalanceTool,
  SolanaBalanceOtherTool,
  SolanaTransferTool,
  SolanaDeployTokenTool,
  SolanaDeployToken2022Tool,
  SolanaDeployCollectionTool,
  SolanaMintNFTTool,
  SolanaTradeTool,
  SolanaRequestFundsTool,
  SolanaRegisterDomainTool,
  SolanaGetWalletAddressTool,
  SolanaPumpfunTokenLaunchTool,
  SolanaCreateImageTool,
  SolanaLendAssetTool,
  SolanaLuloLendTool,
  SolanaLuloWithdrawTool,
  SolanaTPSCalculatorTool,
  SolanaStakeTool,
  SolanaRestakeTool,
  SolanaFetchPriceTool,
  SolanaGetDomainTool,
  SolanaTokenDataTool,
  SolanaTokenDataByTickerTool,
  SolanaCompressedAirdropTool,
  SolanaRaydiumCreateAmmV4,
  SolanaRaydiumCreateClmm,
  SolanaRaydiumCreateCpmm,
  SolanaOpenbookCreateMarket,
  SolanaManifestCreateMarket,
  SolanaLimitOrderTool,
  SolanaBatchOrderTool,
  SolanaCancelAllOrdersTool,
  SolanaWithdrawAllTool,
  SolanaClosePosition,
  SolanaOrcaCreateCLMM,
  SolanaOrcaCreateSingleSideLiquidityPool,
  SolanaOrcaFetchPositions,
  SolanaOrcaOpenCenteredPosition,
  SolanaOrcaOpenSingleSidedPosition,
  SolanaPythFetchPrice,
  SolanaResolveDomainTool,
  SolanaGetOwnedDomains,
  SolanaGetOwnedTldDomains,
  SolanaGetAllTlds,
  SolanaGetMainDomain,
  SolanaResolveAllDomainsTool,
  SolanaCreateGibworkTask,
  SolanaRockPaperScissorsTool,
  SolanaTipLinkTool,
  SolanaListNFTForSaleTool,
  SolanaCancelNFTListingTool,
  SolanaCloseEmptyTokenAccounts,
  SolanaFetchTokenReportSummaryTool,
  SolanaFetchTokenDetailedReportTool,
  Solana3LandCreateSingle,
  Solana3LandCreateCollection,
  SolanaPerpOpenTradeTool,
  SolanaPerpCloseTradeTool,
  SolanaFlashOpenTrade,
  SolanaFlashCloseTrade,
  SolanaCreate2by2Multisig,
  SolanaDepositTo2by2Multisig,
  SolanaTransferFrom2by2Multisig,
  SolanaCreateProposal2by2Multisig,
  SolanaApproveProposal2by2Multisig,
  SolanaExecuteProposal2by2Multisig,
  SolanaRejectProposal2by2Multisig,
  SolanaMeteoraCreateDynamicPool,
  SolanaMeteoraCreateDlmmPool,
  SolanaSendTransactionWithPriorityFee,
  SolanaHeliusWebhookTool,
  SolanaGetHeliusWebhookTool,
  SolanaDeleteHeliusWebhookTool,
  SolanaParseTransactionHeliusTool,
  SolanaGetAllAssetsByOwner,
  SolanaCheckDriftAccountTool,
  SolanaCreateDriftUserAccountTool,
  SolanaCreateDriftVaultTool,
  SolanaDepositIntoDriftVaultTool,
  SolanaDepositToDriftUserAccountTool,
  SolanaDeriveVaultAddressTool,
  SolanaDriftUserAccountInfoTool,
  SolanaDriftVaultInfoTool,
  SolanaRequestDriftWithdrawalTool,
  SolanaTradeDelegatedDriftVaultTool,
  SolanaTradeDriftPerpAccountTool,
  SolanaUpdateDriftVaultDelegateTool,
  SolanaUpdateDriftVaultTool,
  SolanaWithdrawFromDriftAccountTool,
  SolanaWithdrawFromDriftVaultTool,
  SolanaDriftLendAndBorrowAPYTool,
  SolanaDriftEntryQuoteOfPerpTradeTool,
  SolanaDriftPerpMarketFundingRateTool,
  SolanaDriftSpotTokenSwapTool,
  SolanaRequestUnstakeFromDriftInsuranceFundTool,
  SolanaStakeToDriftInsuranceFundTool,
  SolanaUnstakeFromDriftInsuranceFundTool,
  SolanaVoltrGetPositionValues,
  SolanaVoltrDepositStrategy,
  SolanaVoltrWithdrawStrategy,
  SolanaGetAssetTool,
  SolanaGetAssetsByAuthorityTool,
  SolanaGetAssetsByCreatorTool,
  SolanaGetInfoTool,
  SolanaCrossChainSwapTool,
  SolanaAlloraGetPriceInference,
  SolanaAlloraGetAllTopics,
  SolanaAlloraGetInferenceByTopicId,
  SolanaCloseAccountsTool,
  SolanaBurnTokensTool,
  SolanaMergeTokensTool,
  SolanaSpreadTokenTool,
  SolanaSwitchboardSimulateFeed,
  ElfaPingTool,
  ElfaApiKeyStatusTool,
  ElfaGetMentionsTool,
  ElfaTrendingTokensTool,
  ElfaSearchMentionsTool,
  ElfaGetTopMentionsTool,
  ElfaAccountSmartStatsTool,
  SolanaFluxbeamCreatePoolTool,
  CctpTransferTool,
  TokenTransferTool,
  CreateWrappedTokenTool,
  GetWormholeSupportedChainsTool,
  SolanaParseAccountTool,
  SolanaParseInstructionTool,
} from "./index";
import {
  SolanaCancelLimitOrdersTool,
  SolanaCreateLimitOrderTool,
  SolanaGetOpenOrdersTool,
  SolanaGetOrderHistoryTool,
} from "./jupiter";
import {
  SanctumAddLiquidityTool,
  SanctumGetLSTAPYTool,
  SanctumGetLSTPriceTool,
  SanctumGetLSTTVLTool,
  SanctumGetOwnedLSTTool,
  SanctumRemoveLiquidityTool,
  SanctumSwapLSTTool,
} from "./sanctum";

export function createSolanaTools(solanaKit: SolanaAgentKit) {
  return [
    new SolanaGetInfoTool(solanaKit),
    new SolanaBalanceTool(solanaKit),
    new SolanaBalanceOtherTool(solanaKit),
    new SolanaTransferTool(solanaKit),
    new SolanaDeployTokenTool(solanaKit),
    new SolanaDeployToken2022Tool(solanaKit),
    new SolanaDeployCollectionTool(solanaKit),
    new SolanaMintNFTTool(solanaKit),
    new SolanaTradeTool(solanaKit),
    new SolanaRequestFundsTool(solanaKit),
    new SolanaRegisterDomainTool(solanaKit),
    new SolanaGetWalletAddressTool(solanaKit),
    new SolanaPumpfunTokenLaunchTool(solanaKit),
    new SolanaCreateImageTool(solanaKit),
    new SolanaLendAssetTool(solanaKit),
    new SolanaLuloLendTool(solanaKit),
    new SolanaLuloWithdrawTool(solanaKit),
    new SolanaTPSCalculatorTool(solanaKit),
    new SolanaStakeTool(solanaKit),
    new SolanaRestakeTool(solanaKit),
    new SolanaFetchPriceTool(solanaKit),
    new SolanaGetDomainTool(solanaKit),
    new SolanaTokenDataTool(solanaKit),
    new SolanaTokenDataByTickerTool(solanaKit),
    new SolanaCompressedAirdropTool(solanaKit),
    new SolanaRaydiumCreateAmmV4(solanaKit),
    new SolanaRaydiumCreateClmm(solanaKit),
    new SolanaRaydiumCreateCpmm(solanaKit),
    new SolanaOpenbookCreateMarket(solanaKit),
    new SolanaManifestCreateMarket(solanaKit),
    new SolanaLimitOrderTool(solanaKit),
    new SolanaBatchOrderTool(solanaKit),
    new SolanaCancelAllOrdersTool(solanaKit),
    new SolanaWithdrawAllTool(solanaKit),
    new SolanaMeteoraCreateDynamicPool(solanaKit),
    new SolanaMeteoraCreateDlmmPool(solanaKit),
    new SolanaClosePosition(solanaKit),
    new SolanaOrcaCreateCLMM(solanaKit),
    new SolanaOrcaCreateSingleSideLiquidityPool(solanaKit),
    new SolanaOrcaFetchPositions(solanaKit),
    new SolanaOrcaOpenCenteredPosition(solanaKit),
    new SolanaOrcaOpenSingleSidedPosition(solanaKit),
    new SolanaPythFetchPrice(solanaKit),
    new SolanaResolveDomainTool(solanaKit),
    new SolanaGetOwnedDomains(solanaKit),
    new SolanaGetOwnedTldDomains(solanaKit),
    new SolanaGetAllTlds(solanaKit),
    new SolanaGetMainDomain(solanaKit),
    new SolanaResolveAllDomainsTool(solanaKit),
    new SolanaCreateGibworkTask(solanaKit),
    new SolanaRockPaperScissorsTool(solanaKit),
    new SolanaTipLinkTool(solanaKit),
    new SolanaListNFTForSaleTool(solanaKit),
    new SolanaCancelNFTListingTool(solanaKit),
    new SolanaCloseEmptyTokenAccounts(solanaKit),
    new SolanaFetchTokenReportSummaryTool(solanaKit),
    new SolanaFetchTokenDetailedReportTool(solanaKit),
    new Solana3LandCreateSingle(solanaKit),
    new Solana3LandCreateCollection(solanaKit),
    new SolanaPerpOpenTradeTool(solanaKit),
    new SolanaPerpCloseTradeTool(solanaKit),
    new SolanaFlashOpenTrade(solanaKit),
    new SolanaFlashCloseTrade(solanaKit),
    new SolanaCreate2by2Multisig(solanaKit),
    new SolanaCreateProposal2by2Multisig(solanaKit),
    new SolanaApproveProposal2by2Multisig(solanaKit),
    new SolanaRejectProposal2by2Multisig(solanaKit),
    new SolanaExecuteProposal2by2Multisig(solanaKit),
    new SolanaDepositTo2by2Multisig(solanaKit),
    new SolanaTransferFrom2by2Multisig(solanaKit),
    new SolanaSendTransactionWithPriorityFee(solanaKit),
    new SolanaHeliusWebhookTool(solanaKit),
    new SolanaGetHeliusWebhookTool(solanaKit),
    new SolanaDeleteHeliusWebhookTool(solanaKit),
    new SolanaParseTransactionHeliusTool(solanaKit),
    new SolanaGetAllAssetsByOwner(solanaKit),
    new SolanaCreateDriftUserAccountTool(solanaKit),
    new SolanaCreateDriftVaultTool(solanaKit),
    new SolanaDepositIntoDriftVaultTool(solanaKit),
    new SolanaDepositToDriftUserAccountTool(solanaKit),
    new SolanaDeriveVaultAddressTool(solanaKit),
    new SolanaCheckDriftAccountTool(solanaKit),
    new SolanaDriftUserAccountInfoTool(solanaKit),
    new SolanaRequestDriftWithdrawalTool(solanaKit),
    new SolanaTradeDelegatedDriftVaultTool(solanaKit),
    new SolanaTradeDriftPerpAccountTool(solanaKit),
    new SolanaUpdateDriftVaultDelegateTool(solanaKit),
    new SolanaUpdateDriftVaultTool(solanaKit),
    new SolanaDriftVaultInfoTool(solanaKit),
    new SolanaWithdrawFromDriftAccountTool(solanaKit),
    new SolanaWithdrawFromDriftVaultTool(solanaKit),
    new SolanaDriftSpotTokenSwapTool(solanaKit),
    new SolanaStakeToDriftInsuranceFundTool(solanaKit),
    new SolanaRequestUnstakeFromDriftInsuranceFundTool(solanaKit),
    new SolanaUnstakeFromDriftInsuranceFundTool(solanaKit),
    new SolanaDriftLendAndBorrowAPYTool(solanaKit),
    new SolanaDriftEntryQuoteOfPerpTradeTool(solanaKit),
    new SolanaDriftPerpMarketFundingRateTool(solanaKit),
    new SolanaVoltrGetPositionValues(solanaKit),
    new SolanaVoltrDepositStrategy(solanaKit),
    new SolanaVoltrWithdrawStrategy(solanaKit),
    new SolanaGetAssetTool(solanaKit),
    new SolanaGetAssetsByAuthorityTool(solanaKit),
    new SolanaGetAssetsByCreatorTool(solanaKit),
    new SolanaSwitchboardSimulateFeed(solanaKit),
    new SolanaCrossChainSwapTool(solanaKit),
    new SolanaAlloraGetAllTopics(solanaKit),
    new SolanaAlloraGetInferenceByTopicId(solanaKit),
    new SolanaCloseAccountsTool(solanaKit),
    new SolanaBurnTokensTool(solanaKit),
    new SolanaMergeTokensTool(solanaKit),
    new SolanaSpreadTokenTool(solanaKit),
    new SolanaAlloraGetPriceInference(solanaKit),
    new ElfaPingTool(solanaKit),
    new ElfaApiKeyStatusTool(solanaKit),
    new ElfaGetMentionsTool(solanaKit),
    new ElfaTrendingTokensTool(solanaKit),
    new ElfaSearchMentionsTool(solanaKit),
    new ElfaGetTopMentionsTool(solanaKit),
    new ElfaAccountSmartStatsTool(solanaKit),
    new SolanaFluxbeamCreatePoolTool(solanaKit),
    new CctpTransferTool(solanaKit),
    new TokenTransferTool(solanaKit),
    new CreateWrappedTokenTool(solanaKit),
    new GetWormholeSupportedChainsTool(solanaKit),
    new SolanaCreateLimitOrderTool(solanaKit),
    new SolanaCancelLimitOrdersTool(solanaKit),
    new SolanaGetOpenOrdersTool(solanaKit),
    new SolanaGetOrderHistoryTool(solanaKit),
    new SolanaParseAccountTool(solanaKit),
    new SolanaParseInstructionTool(solanaKit),
    new SanctumGetLSTPriceTool(solanaKit),
    new SanctumGetLSTTVLTool(solanaKit),
    new SanctumGetLSTAPYTool(solanaKit),
    new SanctumGetOwnedLSTTool(solanaKit),
    new SanctumAddLiquidityTool(solanaKit),
    new SanctumRemoveLiquidityTool(solanaKit),
    new SanctumSwapLSTTool(solanaKit),
    // new SanctumGetPriceTool(solanaKit),
    // new SanctumGetApyTool(solanaKit),
    // new SanctumGetTvlTool(solanaKit),
    // new SanctumAddLiquidityTool(solanaKit),
    // new SanctumRemoveLiquidityTool(solanaKit),
    // new SanctumGetOwnedLstTool(solanaKit),
    // new SanctumSwapLstTool(solanaKit),
  ];
}
