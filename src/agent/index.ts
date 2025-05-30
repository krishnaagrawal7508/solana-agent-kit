import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import bs58 from "bs58";
import Decimal from "decimal.js";
import {
  CreateCollectionOptions,
  CreateSingleOptions,
  StoreInitOptions,
} from "@3land/listings-sdk/dist/types/implementation/implementationTypes";
import { DEFAULT_OPTIONS } from "../constants";
import {
  deploy_collection,
  deploy_token,
  deploy_token2022,
  get_balance,
  get_balance_other,
  getTPS,
  resolveSolDomain,
  getPrimaryDomain,
  launchPumpFunToken,
  lendAsset,
  luloLend,
  luloWithdraw,
  mintCollectionNFT,
  openbookCreateMarket,
  manifestCreateMarket,
  raydiumCreateAmmV4,
  raydiumCreateClmm,
  raydiumCreateCpmm,
  registerDomain,
  request_faucet_funds,
  trade,
  limitOrder,
  batchOrder,
  cancelAllOrders,
  withdrawAll,
  closePerpTradeShort,
  closePerpTradeLong,
  openPerpTradeShort,
  openPerpTradeLong,
  transfer,
  getTokenDataByAddress,
  getTokenDataByTicker,
  stakeWithJup,
  stakeWithSolayer,
  sendCompressedAirdrop,
  orcaCreateSingleSidedLiquidityPool,
  orcaCreateCLMM,
  orcaOpenCenteredPositionWithLiquidity,
  orcaOpenSingleSidedPosition,
  FEE_TIERS,
  fetchPrice,
  getAllDomainsTLDs,
  getAllRegisteredAllDomains,
  getOwnedDomainsForTLD,
  getMainAllDomainsDomain,
  getOwnedAllDomains,
  resolveAllDomains,
  create_gibwork_task,
  orcaClosePosition,
  orcaFetchPositions,
  rock_paper_scissor,
  create_TipLink,
  listNFTForSale,
  cancelListing,
  closeEmptyTokenAccounts,
  fetchTokenReportSummary,
  fetchTokenDetailedReport,
  fetchPythPrice,
  fetchPythPriceFeedID,
  flashOpenTrade,
  flashCloseTrade,
  createMeteoraDynamicAMMPool,
  createMeteoraDlmmPool,
  createCollection,
  createSingle,
  multisig_transfer_from_treasury,
  create_squads_multisig,
  multisig_create_proposal,
  multisig_deposit_to_treasury,
  multisig_reject_proposal,
  multisig_approve_proposal,
  multisig_execute_proposal,
  parseTransaction,
  sendTransactionWithPriorityFee,
  getAssetsByOwner,
  getHeliusWebhook,
  create_HeliusWebhook,
  deleteHeliusWebhook,
  createDriftUserAccount,
  createVault,
  depositIntoVault,
  depositToDriftUserAccount,
  getVaultAddress,
  doesUserHaveDriftAccount,
  driftUserAccountInfo,
  requestWithdrawalFromVault,
  tradeDriftVault,
  driftPerpTrade,
  updateVault,
  getVaultInfo,
  withdrawFromDriftUserAccount,
  withdrawFromDriftVault,
  updateVaultDelegate,
  get_token_balance,
  getAvailableDriftSpotMarkets,
  getAvailableDriftPerpMarkets,
  stakeToDriftInsuranceFund,
  requestUnstakeFromDriftInsuranceFund,
  unstakeFromDriftInsuranceFund,
  swapSpotToken,
  calculatePerpMarketFundingRate,
  getEntryQuoteOfPerpTrade,
  getLendingAndBorrowAPY,
  voltrGetPositionValues,
  voltrDepositStrategy,
  voltrWithdrawStrategy,
  get_asset,
  get_assets_by_authority,
  get_assets_by_creator,
  simulate_switchboard_feed,
  swap,
  getPriceInference,
  getAllTopics,
  getInferenceByTopicId,
  getDebridgeSupportedChains,
  getDebridgeTokensInfo,
  createDebridgeBridgeOrder,
  checkDebridgeTransactionStatus,
  executeDebridgeBridgeOrder,
  closeAccounts,
  burnTokens,
  mergeTokens,
  spreadToken,
  PriorityFee,
  TargetTokenStruct,
  InputAssetStruct,
  fluxBeamCreatePool,
  getLatestPools,
  getTokenInfo,
  getTokenPriceData,
  getTopGainers,
  getTrendingPools,
  getTrendingTokens,
  getWormholeSupportedChains,
  tokenTransfer,
  cctpTransfer,
  createWrappedToken,
  parse_instruction,
  parse_account,
  sanctumGetLSTPrice,
  sanctumGetLSTTVL,
  sanctumGetLSTAPY,
  sanctumGetOwnedLST,
  sanctumSwapLST,
  sanctumAddLiquidity,
  sanctumRemoveLiquidity,
} from "../tools";
import {
  Config,
  TokenCheck,
  CollectionDeployment,
  CollectionOptions,
  GibworkCreateTaskReponse,
  JupiterTokenData,
  MintCollectionNFTResponse,
  PumpfunLaunchResponse,
  PumpFunTokenOptions,
  OrderParams,
  FlashTradeParams,
  FlashCloseTradeParams,
  HeliusWebhookIdResponse,
  HeliusWebhookResponse,
  deBridgeOrderInput,
  deBridgeSupportedChainsResponse,
  deBridgeOrderResponse,
  deBridgeOrderStatusResponse,
  deBridgeTokensInfoResponse,
  SplAuthorityInput,
  CctpTransferInput,
  TokenTransferInput,
  CreateWrappedTokenInput,
  CreateJupiterOrderRequest,
  CancelJupiterOrderRequest,
  InstructionParserResponse,
  AccountParserResponse,
} from "../types";
import {
  DasApiAsset,
  DasApiAssetList,
  GetAssetsByAuthorityRpcInput,
  GetAssetsByCreatorRpcInput,
} from "@metaplex-foundation/digital-asset-standard-api";
import { AlloraInference, AlloraTopic } from "@alloralabs/allora-sdk";
import {
  pingElfaAiApi,
  getElfaAiApiKeyStatus,
  getSmartMentions,
  getTopMentionsByTicker,
  searchMentionsByKeywords,
  getTrendingTokensUsingElfaAi,
  getSmartTwitterAccountStats,
} from "../tools/elfa_ai";
import {
  getQuote as getOkxQuote,
  executeSwap as executeOkxSwapTool,
  getTokens,
  getChainData,
  getLiquidity,
} from "../tools/okx-dex";
import { createLimitOrder } from "../tools/jupiter/create_limit_order";
import { cancelLimitOrders } from "../tools/jupiter/cancel_limit_orders";
import { getOpenLimitOrders } from "../tools/jupiter/get_open_limit_orders";
import { getLimitOrderHistory } from "../tools/jupiter/get_limit_order_history";

/**
 * Main class for interacting with Solana blockchain
 * Provides a unified interface for token operations, NFT management, trading and more
 *
 * @class SolanaAgentKit
 * @property {Connection} connection - Solana RPC connection
 * @property {Keypair} wallet - Wallet keypair for signing transactions
 * @property {PublicKey} wallet_address - Public key of the wallet
 * @property {Config} config - Configuration object
 */
export class SolanaAgentKit {
  public connection: Connection;
  public wallet: Keypair;
  public wallet_address: PublicKey;
  public config?: Config;

  /**
   * @deprecated Using openai_api_key directly in constructor is deprecated.
   * Please use the new constructor with Config object instead:
   * @example
   * const agent = new SolanaAgentKit(privateKey, rpcUrl, {
   *   OPENAI_API_KEY: 'your-key'
   * });
   */
  constructor(
    private_key: string,
    rpc_url: string,
    openai_api_key: string | null,
  );

  constructor(private_key: string, rpc_url: string, config?: Config);

  constructor(
    private_key: string,
    rpc_url: string,
    configOrKey?: Config | string | null,
  ) {
    this.connection = new Connection(
      rpc_url || "https://api.mainnet-beta.solana.com",
    );
    this.wallet = Keypair.fromSecretKey(bs58.decode(private_key));
    this.wallet_address = this.wallet.publicKey;

    // Handle both old and new patterns
    if (typeof configOrKey === "string" || configOrKey === null) {
      this.config = { OPENAI_API_KEY: configOrKey || "" };
    } else {
      this.config = configOrKey as Config;
    }
  }

  // Tool methods
  async requestFaucetFunds() {
    return request_faucet_funds(this);
  }

  async deployToken(
    name: string,
    uri: string,
    symbol: string,
    decimals: number = DEFAULT_OPTIONS.TOKEN_DECIMALS,
    authority: SplAuthorityInput,
    initialSupply?: number,
  ): Promise<{ mint: PublicKey }> {
    return deploy_token(
      this,
      name,
      uri,
      symbol,
      decimals,
      authority,
      initialSupply,
    );
  }

  async deployToken2022(
    name: string,
    uri: string,
    symbol: string,
    decimals: number = DEFAULT_OPTIONS.TOKEN_DECIMALS,
    initialSupply?: number,
  ): Promise<{ mint: PublicKey }> {
    return deploy_token2022(this, name, uri, symbol, decimals, initialSupply);
  }

  async deployCollection(
    options: CollectionOptions,
  ): Promise<CollectionDeployment> {
    return deploy_collection(this, options);
  }

  async getBalance(token_address?: PublicKey): Promise<number> {
    return get_balance(this, token_address);
  }

  async getTokenBalances(wallet_address?: PublicKey): Promise<{
    sol: number;
    tokens: Array<{
      tokenAddress: string;
      name: string;
      symbol: string;
      balance: number;
      decimals: number;
    }>;
  }> {
    return get_token_balance(this, wallet_address);
  }

  async getBalanceOther(
    walletAddress: PublicKey,
    tokenAddress?: PublicKey,
  ): Promise<number> {
    return get_balance_other(this, walletAddress, tokenAddress);
  }

  async mintNFT(
    collectionMint: PublicKey,
    metadata: Parameters<typeof mintCollectionNFT>[2],
    recipient?: PublicKey,
  ): Promise<MintCollectionNFTResponse> {
    return mintCollectionNFT(this, collectionMint, metadata, recipient);
  }

  async transfer(
    to: PublicKey,
    amount: number,
    mint?: PublicKey,
  ): Promise<string> {
    return transfer(this, to, amount, mint);
  }

  async registerDomain(name: string, spaceKB?: number): Promise<string> {
    return registerDomain(this, name, spaceKB);
  }

  async resolveSolDomain(domain: string): Promise<PublicKey> {
    return resolveSolDomain(this, domain);
  }

  async getPrimaryDomain(account: PublicKey): Promise<string> {
    return getPrimaryDomain(this, account);
  }

  async trade(
    outputMint: PublicKey,
    inputAmount: number,
    inputMint?: PublicKey,
    slippageBps: number = DEFAULT_OPTIONS.SLIPPAGE_BPS,
  ): Promise<string> {
    return trade(this, outputMint, inputAmount, inputMint, slippageBps);
  }

  async limitOrder(
    marketId: PublicKey,
    quantity: number,
    side: string,
    price: number,
  ): Promise<string> {
    return limitOrder(this, marketId, quantity, side, price);
  }

  async batchOrder(
    marketId: PublicKey,
    orders: OrderParams[],
  ): Promise<string> {
    return batchOrder(this, marketId, orders);
  }

  async cancelAllOrders(marketId: PublicKey): Promise<string> {
    return cancelAllOrders(this, marketId);
  }

  async withdrawAll(marketId: PublicKey): Promise<string> {
    return withdrawAll(this, marketId);
  }

  async openPerpTradeLong(
    args: Omit<Parameters<typeof openPerpTradeLong>[0], "agent">,
  ): Promise<string> {
    return openPerpTradeLong({
      agent: this,
      ...args,
    });
  }

  async openPerpTradeShort(
    args: Omit<Parameters<typeof openPerpTradeShort>[0], "agent">,
  ): Promise<string> {
    return openPerpTradeShort({
      agent: this,
      ...args,
    });
  }

  async closePerpTradeShort(
    args: Omit<Parameters<typeof closePerpTradeShort>[0], "agent">,
  ): Promise<string> {
    return closePerpTradeShort({
      agent: this,
      ...args,
    });
  }

  async closePerpTradeLong(
    args: Omit<Parameters<typeof closePerpTradeLong>[0], "agent">,
  ): Promise<string> {
    return closePerpTradeLong({
      agent: this,
      ...args,
    });
  }

  async parseInstruction(
    program_id: string,
    instruction_data: string,
  ): Promise<InstructionParserResponse> {
    return parse_instruction(program_id, instruction_data);
  }

  async parseAccount(
    program_id: string,
    account_data: string,
  ): Promise<AccountParserResponse> {
    return parse_account(program_id, account_data);
  }

  async lendAssets(amount: number): Promise<string> {
    return lendAsset(this, amount);
  }

  async luloLend(mintAddress: string, amount: number): Promise<string> {
    return luloLend(this, mintAddress, amount);
  }

  async luloWithdraw(mintAddress: string, amount: number): Promise<string> {
    return luloWithdraw(this, mintAddress, amount);
  }

  async getTPS(): Promise<number> {
    return getTPS(this);
  }

  async getTokenDataByAddress(
    mint: string,
  ): Promise<JupiterTokenData | undefined> {
    return getTokenDataByAddress(new PublicKey(mint));
  }

  async getTokenDataByTicker(
    ticker: string,
  ): Promise<JupiterTokenData | undefined> {
    return getTokenDataByTicker(ticker);
  }

  async fetchTokenPrice(mint: string) {
    return fetchPrice(new PublicKey(mint));
  }

  async launchPumpFunToken(
    tokenName: string,
    tokenTicker: string,
    description: string,
    imageUrl: string,
    options?: PumpFunTokenOptions,
  ): Promise<PumpfunLaunchResponse> {
    return launchPumpFunToken(
      this,
      tokenName,
      tokenTicker,
      description,
      imageUrl,
      options,
    );
  }

  async stake(amount: number): Promise<string> {
    return stakeWithJup(this, amount);
  }

  async restake(amount: number): Promise<string> {
    return stakeWithSolayer(this, amount);
  }

  async sendCompressedAirdrop(
    mintAddress: string,
    amount: number,
    decimals: number,
    recipients: string[],
    priorityFeeInLamports: number,
    shouldLog: boolean,
  ): Promise<string[]> {
    return await sendCompressedAirdrop(
      this,
      new PublicKey(mintAddress),
      amount,
      decimals,
      recipients.map((recipient) => new PublicKey(recipient)),
      priorityFeeInLamports,
      shouldLog,
    );
  }

  async meteoraCreateDynamicPool(
    tokenAMint: PublicKey,
    tokenBMint: PublicKey,
    tokenAAmount: BN,
    tokenBAmount: BN,
    tradeFeeNumerator: number,
    activationPoint: BN | null,
    hasAlphaVault: boolean,
    activationType: number,
  ): Promise<string> {
    return createMeteoraDynamicAMMPool(
      this,
      tokenAMint,
      tokenBMint,
      tokenAAmount,
      tokenBAmount,
      {
        tradeFeeNumerator,
        activationPoint,
        hasAlphaVault,
        activationType,
        padding: new Array(90).fill(0),
      },
    );
  }

  async meteoraCreateDlmmPool(
    tokenAMint: PublicKey,
    tokenBMint: PublicKey,
    binStep: number,
    initialPrice: number,
    priceRoundingUp: boolean,
    feeBps: number,
    activationType: number,
    hasAlphaVault: boolean,
    activationPoint: BN | undefined,
  ): Promise<string> {
    return createMeteoraDlmmPool(
      this,
      binStep,
      tokenAMint,
      tokenBMint,
      initialPrice,
      priceRoundingUp,
      feeBps,
      activationType,
      hasAlphaVault,
      activationPoint,
    );
  }

  async orcaClosePosition(positionMintAddress: PublicKey) {
    return orcaClosePosition(this, positionMintAddress);
  }

  async orcaCreateCLMM(
    mintDeploy: PublicKey,
    mintPair: PublicKey,
    initialPrice: Decimal,
    feeTier: keyof typeof FEE_TIERS,
  ) {
    return orcaCreateCLMM(this, mintDeploy, mintPair, initialPrice, feeTier);
  }

  async orcaCreateSingleSidedLiquidityPool(
    depositTokenAmount: number,
    depositTokenMint: PublicKey,
    otherTokenMint: PublicKey,
    initialPrice: Decimal,
    maxPrice: Decimal,
    feeTier: keyof typeof FEE_TIERS,
  ) {
    return orcaCreateSingleSidedLiquidityPool(
      this,
      depositTokenAmount,
      depositTokenMint,
      otherTokenMint,
      initialPrice,
      maxPrice,
      feeTier,
    );
  }

  async orcaFetchPositions() {
    return orcaFetchPositions(this);
  }

  async orcaOpenCenteredPositionWithLiquidity(
    whirlpoolAddress: PublicKey,
    priceOffsetBps: number,
    inputTokenMint: PublicKey,
    inputAmount: Decimal,
  ) {
    return orcaOpenCenteredPositionWithLiquidity(
      this,
      whirlpoolAddress,
      priceOffsetBps,
      inputTokenMint,
      inputAmount,
    );
  }

  async orcaOpenSingleSidedPosition(
    whirlpoolAddress: PublicKey,
    distanceFromCurrentPriceBps: number,
    widthBps: number,
    inputTokenMint: PublicKey,
    inputAmount: Decimal,
  ): Promise<string> {
    return orcaOpenSingleSidedPosition(
      this,
      whirlpoolAddress,
      distanceFromCurrentPriceBps,
      widthBps,
      inputTokenMint,
      inputAmount,
    );
  }

  async resolveAllDomains(domain: string): Promise<PublicKey | undefined> {
    return resolveAllDomains(this, domain);
  }

  async getOwnedAllDomains(owner: PublicKey): Promise<string[]> {
    return getOwnedAllDomains(this, owner);
  }

  async getOwnedDomainsForTLD(tld: string): Promise<string[]> {
    return getOwnedDomainsForTLD(this, tld);
  }

  async getAllDomainsTLDs(): Promise<string[]> {
    return getAllDomainsTLDs(this);
  }

  async getAllRegisteredAllDomains(): Promise<string[]> {
    return getAllRegisteredAllDomains(this);
  }

  async getMainAllDomainsDomain(owner: PublicKey): Promise<string | null> {
    return getMainAllDomainsDomain(this, owner);
  }

  async raydiumCreateAmmV4(
    marketId: PublicKey,
    baseAmount: BN,
    quoteAmount: BN,
    startTime: BN,
  ): Promise<string> {
    return raydiumCreateAmmV4(
      this,
      marketId,

      baseAmount,
      quoteAmount,

      startTime,
    );
  }

  async raydiumCreateClmm(
    mint1: PublicKey,
    mint2: PublicKey,
    configId: PublicKey,
    initialPrice: Decimal,
    startTime: BN,
  ): Promise<string> {
    return raydiumCreateClmm(
      this,
      mint1,
      mint2,
      configId,
      initialPrice,
      startTime,
    );
  }

  async raydiumCreateCpmm(
    mint1: PublicKey,
    mint2: PublicKey,
    configId: PublicKey,
    mintAAmount: BN,
    mintBAmount: BN,
    startTime: BN,
  ): Promise<string> {
    return raydiumCreateCpmm(
      this,
      mint1,
      mint2,
      configId,
      mintAAmount,
      mintBAmount,

      startTime,
    );
  }

  async openbookCreateMarket(
    baseMint: PublicKey,
    quoteMint: PublicKey,
    lotSize: number = 1,
    tickSize: number = 0.01,
  ): Promise<string[]> {
    return openbookCreateMarket(
      this,
      baseMint,
      quoteMint,

      lotSize,
      tickSize,
    );
  }

  async manifestCreateMarket(
    baseMint: PublicKey,
    quoteMint: PublicKey,
  ): Promise<string[]> {
    return manifestCreateMarket(this, baseMint, quoteMint);
  }

  async getPythPriceFeedID(tokenSymbol: string): Promise<string> {
    return fetchPythPriceFeedID(tokenSymbol);
  }

  async getPythPrice(priceFeedID: string): Promise<string> {
    return fetchPythPrice(priceFeedID);
  }

  async createGibworkTask(
    title: string,
    content: string,
    requirements: string,
    tags: string[],
    tokenMintAddress: string,
    tokenAmount: number,
    payer?: string,
  ): Promise<GibworkCreateTaskReponse> {
    return create_gibwork_task(
      this,
      title,
      content,
      requirements,
      tags,
      new PublicKey(tokenMintAddress),
      tokenAmount,
      payer ? new PublicKey(payer) : undefined,
    );
  }

  async rockPaperScissors(
    amount: number,
    choice: "rock" | "paper" | "scissors",
  ) {
    return rock_paper_scissor(this, amount, choice);
  }
  async createTiplink(amount: number, splmintAddress?: PublicKey) {
    return create_TipLink(this, amount, splmintAddress);
  }

  async tensorListNFT(nftMint: PublicKey, price: number): Promise<string> {
    return listNFTForSale(this, nftMint, price);
  }

  async tensorCancelListing(nftMint: PublicKey): Promise<string> {
    return cancelListing(this, nftMint);
  }

  async closeEmptyTokenAccounts(): Promise<{
    signature: string;
    size: number;
  }> {
    return closeEmptyTokenAccounts(this);
  }

  async fetchTokenReportSummary(mint: string): Promise<TokenCheck> {
    return fetchTokenReportSummary(mint);
  }

  async fetchTokenDetailedReport(mint: string): Promise<TokenCheck> {
    return fetchTokenDetailedReport(mint);
  }

  /**
   * Opens a new trading position on Flash.Trade
   * @param params Flash trade parameters including market, side, collateral, leverage, and pool name
   * @returns Transaction signature
   */
  async flashOpenTrade(params: FlashTradeParams): Promise<string> {
    return flashOpenTrade(this, params);
  }

  /**
   * Closes an existing trading position on Flash.Trade
   * @param params Flash trade close parameters
   * @returns Transaction signature
   */
  async flashCloseTrade(params: FlashCloseTradeParams): Promise<string> {
    return flashCloseTrade(this, params);
  }
  async heliusParseTransactions(transactionId: string): Promise<any> {
    return parseTransaction(this, transactionId);
  }
  async getAllAssetsbyOwner(owner: PublicKey, limit: number): Promise<any> {
    return getAssetsByOwner(this, owner, limit);
  }

  async create3LandCollection(
    collectionOpts: CreateCollectionOptions,
    isDevnet: boolean = false,
    priorityFeeParam?: number,
  ): Promise<string> {
    const optionsWithBase58: StoreInitOptions = {
      privateKey: this.wallet.secretKey,
    };
    if (isDevnet) {
      optionsWithBase58.isMainnet = false;
    } else {
      optionsWithBase58.isMainnet = true;
    }

    const tx = await createCollection(
      optionsWithBase58,
      collectionOpts,
      priorityFeeParam,
    );
    return `Transaction: ${tx}`;
  }

  async create3LandNft(
    collectionAccount: string,
    createItemOptions: CreateSingleOptions,
    isDevnet: boolean = false,
    withPool: boolean = false,
    priorityFeeParam?: number,
  ): Promise<string> {
    const optionsWithBase58: StoreInitOptions = {
      privateKey: this.wallet.secretKey,
    };
    if (isDevnet) {
      optionsWithBase58.isMainnet = false;
    } else {
      optionsWithBase58.isMainnet = true;
    }

    const tx = await createSingle(
      optionsWithBase58,
      collectionAccount,
      createItemOptions,
      !isDevnet,
      withPool,
      priorityFeeParam,
    );
    return `Transaction: ${tx}`;
  }
  async sendTranctionWithPriority(
    priorityLevel: string,
    amount: number,
    to: PublicKey,
    splmintAddress?: PublicKey,
  ): Promise<{ transactionId: string; fee: number }> {
    return sendTransactionWithPriorityFee(
      this,
      priorityLevel,
      amount,
      to,
      splmintAddress,
    );
  }

  async createSquadsMultisig(creator: PublicKey): Promise<string> {
    return create_squads_multisig(this, creator);
  }

  async depositToMultisig(
    amount: number,
    vaultIndex: number = 0,
    mint?: PublicKey,
  ): Promise<string> {
    return multisig_deposit_to_treasury(this, amount, vaultIndex, mint);
  }

  async transferFromMultisig(
    amount: number,
    to: PublicKey,
    vaultIndex: number = 0,
    mint?: PublicKey,
  ): Promise<string> {
    return multisig_transfer_from_treasury(this, amount, to, vaultIndex, mint);
  }

  async createMultisigProposal(
    transactionIndex?: number | bigint,
  ): Promise<string> {
    return multisig_create_proposal(this, transactionIndex);
  }

  async approveMultisigProposal(
    transactionIndex?: number | bigint,
  ): Promise<string> {
    return multisig_approve_proposal(this, transactionIndex);
  }

  async rejectMultisigProposal(
    transactionIndex?: number | bigint,
  ): Promise<string> {
    return multisig_reject_proposal(this, transactionIndex);
  }

  async executeMultisigTransaction(
    transactionIndex?: number | bigint,
  ): Promise<string> {
    return multisig_execute_proposal(this, transactionIndex);
  }
  async CreateWebhook(
    accountAddresses: string[],
    webhookURL: string,
  ): Promise<HeliusWebhookResponse> {
    return create_HeliusWebhook(this, accountAddresses, webhookURL);
  }
  async getWebhook(id: string): Promise<HeliusWebhookIdResponse> {
    return getHeliusWebhook(this, id);
  }
  async deleteWebhook(webhookID: string): Promise<any> {
    return deleteHeliusWebhook(this, webhookID);
  }

  async createDriftUserAccount(depositAmount: number, depositSymbol: string) {
    return await createDriftUserAccount(this, depositAmount, depositSymbol);
  }

  async createDriftVault(params: {
    name: string;
    marketName: `${string}-${string}`;
    redeemPeriod: number;
    maxTokens: number;
    minDepositAmount: number;
    managementFee: number;
    profitShare: number;
    hurdleRate?: number;
    permissioned?: boolean;
  }) {
    return await createVault(this, params);
  }

  async depositIntoDriftVault(amount: number, vault: string) {
    return await depositIntoVault(this, amount, vault);
  }
  async depositToDriftUserAccount(
    amount: number,
    symbol: string,
    isRepayment?: boolean,
  ) {
    return await depositToDriftUserAccount(this, amount, symbol, isRepayment);
  }
  async deriveDriftVaultAddress(name: string) {
    return await getVaultAddress(this, name);
  }
  async doesUserHaveDriftAccount() {
    return await doesUserHaveDriftAccount(this);
  }
  async driftUserAccountInfo() {
    return await driftUserAccountInfo(this);
  }
  async requestWithdrawalFromDriftVault(amount: number, vault: string) {
    return await requestWithdrawalFromVault(this, amount, vault);
  }
  async tradeUsingDelegatedDriftVault(
    vault: string,
    amount: number,
    symbol: string,
    action: "long" | "short",
    type: "market" | "limit",
    price?: number,
  ) {
    return await tradeDriftVault(
      this,
      vault,
      amount,
      symbol,
      action,
      type,
      price,
    );
  }
  async tradeUsingDriftPerpAccount(
    amount: number,
    symbol: string,
    action: "long" | "short",
    type: "market" | "limit",
    price?: number,
  ) {
    return await driftPerpTrade(this, { action, amount, symbol, type, price });
  }
  async updateDriftVault(
    vaultAddress: string,
    params: {
      name: string;
      marketName: `${string}-${string}`;
      redeemPeriod: number;
      maxTokens: number;
      minDepositAmount: number;
      managementFee: number;
      profitShare: number;
      hurdleRate?: number;
      permissioned?: boolean;
    },
  ) {
    return await updateVault(this, vaultAddress, params);
  }
  async getDriftVaultInfo(vaultName: string) {
    return await getVaultInfo(this, vaultName);
  }
  async withdrawFromDriftAccount(
    amount: number,
    symbol: string,
    isBorrow?: boolean,
  ) {
    return await withdrawFromDriftUserAccount(this, amount, symbol, isBorrow);
  }
  async withdrawFromDriftVault(vault: string) {
    return await withdrawFromDriftVault(this, vault);
  }
  async updateDriftVaultDelegate(vaultAddress: string, delegate: string) {
    return await updateVaultDelegate(this, vaultAddress, delegate);
  }

  getAvailableDriftMarkets(type?: "spot" | "perp") {
    switch (type) {
      case "spot":
        return getAvailableDriftSpotMarkets();
      case "perp":
        return getAvailableDriftPerpMarkets();
      default:
        return {
          spot: getAvailableDriftSpotMarkets(),
          perp: getAvailableDriftPerpMarkets(),
        };
    }
  }
  async stakeToDriftInsuranceFund(amount: number, symbol: string) {
    return await stakeToDriftInsuranceFund(this, amount, symbol);
  }
  async requestUnstakeFromDriftInsuranceFund(amount: number, symbol: string) {
    return await requestUnstakeFromDriftInsuranceFund(this, amount, symbol);
  }
  async unstakeFromDriftInsuranceFund(symbol: string) {
    return await unstakeFromDriftInsuranceFund(this, symbol);
  }
  async driftSpotTokenSwap(
    params: {
      fromSymbol: string;
      toSymbol: string;
      slippage?: number;
    } & (
      | {
          toAmount: number;
        }
      | { fromAmount: number }
    ),
  ) {
    return await swapSpotToken(this, {
      fromSymbol: params.fromSymbol,
      toSymbol: params.toSymbol,
      // @ts-expect-error - fromAmount and toAmount are mutually exclusive
      fromAmount: params.fromAmount,
      // @ts-expect-error - fromAmount and toAmount are mutually exclusive
      toAmount: params.toAmount,
      slippage: params.slippage,
    });
  }
  async getPerpMarketFundingRate(
    symbol: `${string}-PERP`,
    period: "year" | "hour" = "year",
  ) {
    return calculatePerpMarketFundingRate(this, symbol, period);
  }
  async getEntryQuoteOfPerpTrade(
    amount: number,
    symbol: `${string}-PERP`,
    action: "short" | "long",
  ) {
    return getEntryQuoteOfPerpTrade(symbol, amount, action);
  }
  async getLendAndBorrowAPY(symbol: string) {
    return getLendingAndBorrowAPY(this, symbol);
  }

  async voltrDepositStrategy(
    depositAmount: BN,
    vault: PublicKey,
    strategy: PublicKey,
  ): Promise<string> {
    return voltrDepositStrategy(this, depositAmount, vault, strategy);
  }

  async voltrWithdrawStrategy(
    withdrawAmount: BN,
    vault: PublicKey,
    strategy: PublicKey,
  ): Promise<string> {
    return voltrWithdrawStrategy(this, withdrawAmount, vault, strategy);
  }

  async voltrGetPositionValues(vault: PublicKey): Promise<string> {
    return voltrGetPositionValues(this, vault);
  }

  async getAsset(assetId: string): Promise<DasApiAsset> {
    return get_asset(this, assetId);
  }
  async getAssetsByAuthority(
    params: GetAssetsByAuthorityRpcInput,
  ): Promise<DasApiAssetList> {
    return get_assets_by_authority(this, params);
  }
  async getAssetsByCreator(
    params: GetAssetsByCreatorRpcInput,
  ): Promise<DasApiAssetList> {
    return get_assets_by_creator(this, params);
  }

  async swap(
    amount: string,
    fromChain: string,
    fromToken: string,
    toChain: string,
    toToken: string,
    dstAddr: string,
    slippageBps?: number,
  ): Promise<string> {
    return swap(
      this,
      amount,
      fromChain,
      fromToken,
      toChain,
      toToken,
      dstAddr,
      slippageBps,
    );
  }

  async getPriceInference(
    tokenSymbol: string,
    timeframe: string,
  ): Promise<string> {
    return getPriceInference(this, tokenSymbol, timeframe);
  }
  async getAllTopics(): Promise<AlloraTopic[]> {
    return getAllTopics(this);
  }
  async getInferenceByTopicId(topicId: number): Promise<AlloraInference> {
    return getInferenceByTopicId(this, topicId);
  }
  async closeAccounts(mints: string[]) {
    return await closeAccounts(this, mints);
  }

  async burnTokens(mints: string[]) {
    return await burnTokens(this, mints);
  }

  async mergeTokens(
    inputAssets: InputAssetStruct[],
    outputMint: string,
    priorityFee: PriorityFee,
  ) {
    return await mergeTokens(this, inputAssets, outputMint, priorityFee);
  }

  async spreadToken(
    inputAsset: InputAssetStruct,
    targetTokens: TargetTokenStruct[],
    priorityFee: PriorityFee,
  ) {
    return await spreadToken(this, inputAsset, targetTokens, priorityFee);
  }

  async simulateSwitchboardFeed(
    feed: string,
    crossbarUrl: string,
  ): Promise<string> {
    return simulate_switchboard_feed(this, feed, crossbarUrl);
  }

  async pingElfaAiApi(): Promise<any> {
    const response = await pingElfaAiApi(this);
    return response;
  }

  async getElfaAiApiKeyStatus(): Promise<any> {
    const response = await getElfaAiApiKeyStatus(this);
    return response;
  }

  async getSmartMentions(
    limit: number = 100,
    offset: number = 0,
  ): Promise<any> {
    const response = await getSmartMentions(this, limit, offset);
    return response;
  }

  async getTopMentionsByTicker(
    ticker: string,
    timeWindow: string = "1h",
    page: number = 1,
    pageSize: number = 10,
    includeAccountDetails: boolean = false,
  ): Promise<any> {
    const response = await getTopMentionsByTicker(
      this,
      ticker,
      timeWindow,
      page,
      pageSize,
      includeAccountDetails,
    );
    return response;
  }

  async searchMentionsByKeywords(
    keywords: string,
    from: number,
    to: number,
    limit: number = 20,
  ): Promise<any> {
    const response = await searchMentionsByKeywords(
      this,
      keywords,
      from,
      to,
      limit,
    );
    return response;
  }

  async getTrendingTokens(): Promise<any> {
    const response = await getTrendingTokens(this);
    return response;
  }

  async getTrendingTokensUsingElfaAi(): Promise<any> {
    const response = await getTrendingTokensUsingElfaAi(this);
    return response;
  }

  async getSmartTwitterAccountStats(username: string): Promise<any> {
    const response = await getSmartTwitterAccountStats(this, username);
    return response;
  }

  async getDebridgeSupportedChains(): Promise<deBridgeSupportedChainsResponse> {
    return getDebridgeSupportedChains();
  }

  async getDebridgeTokensInfo(
    chainId: string,
    search?: string,
  ): Promise<deBridgeTokensInfoResponse> {
    return getDebridgeTokensInfo({ chainId, search });
  }

  async createDebridgeOrder(
    orderInput: deBridgeOrderInput,
  ): Promise<deBridgeOrderResponse> {
    return createDebridgeBridgeOrder(orderInput);
  }

  async executeDebridgeOrder(transactionData: string): Promise<string> {
    return executeDebridgeBridgeOrder(this, transactionData);
  }

  async checkDebridgeTransactionStatus(
    txHashOrOrderId: string,
  ): Promise<deBridgeOrderStatusResponse[]> {
    return checkDebridgeTransactionStatus(this, txHashOrOrderId);
  }

  async fluxbeamCreatePool(
    token_a: PublicKey,
    token_a_amount: number,
    token_b: PublicKey,
    token_b_amount: number,
  ): Promise<string> {
    return fluxBeamCreatePool(
      this,
      token_a,
      token_a_amount,
      token_b,
      token_b_amount,
    );
  }

  async getCoingeckoLatestPools() {
    return await getLatestPools(this);
  }

  async getTokenInfoUsingCoingecko(tokenAddress: string) {
    return await getTokenInfo(this, tokenAddress);
  }

  async getTokenPriceDataUsingCoingecko(...tokenAddresses: string[]) {
    return await getTokenPriceData(this, tokenAddresses);
  }

  async getTopGainersOnCoingecko(
    duration?: "1h" | "24h" | "7d" | "14d" | "30d" | "60d" | "1y",
    noOfCoins?: 300 | 500 | 1000 | "all",
  ) {
    return await getTopGainers(this, duration, noOfCoins);
  }

  async getCoingeckoTrendingPools(duration?: "5m" | "1h" | "24h" | "6h") {
    return await getTrendingPools(this, duration);
  }

  async getTrendingTokensOnCoingecko() {
    return await getTrendingTokens(this);
  }

  // wormhole

  async getWormholeSupportedChains() {
    return await getWormholeSupportedChains();
  }

  async cctpTransfer(input: CctpTransferInput) {
    return await cctpTransfer(input);
  }

  async tokenTransfer(input: TokenTransferInput) {
    return await tokenTransfer(input);
  }

  async createWrappedToken(input: CreateWrappedTokenInput) {
    return await createWrappedToken(input);
  }

  // OKX DEX Methods
  /**
   * Get quote for token swap on OKX DEX
   * @param fromTokenAddress Source token address
   * @param toTokenAddress Target token address
   * @param amount Amount to swap in base units
   * @param slippage Slippage tolerance as a decimal (default: 0.5%)
   * @returns Quote information
   */
  async getOkxQuote(
    fromTokenAddress: string,
    toTokenAddress: string,
    amount: string,
    slippage: string = "0.5",
  ) {
    return getOkxQuote(
      this,
      fromTokenAddress,
      toTokenAddress,
      amount,
      slippage,
    );
  }

  /**
   * Execute token swap on OKX DEX
   * @param fromTokenAddress Source token address
   * @param toTokenAddress Target token address
   * @param amount Amount to swap in base units
   * @param slippage Slippage tolerance as a decimal (default: 0.5%)
   * @param autoSlippage Use auto slippage (default: false)
   * @param maxAutoSlippageBps Maximum auto slippage in basis points (default: 100 = 1%)
   * @param userWalletAddress Optional wallet address to use (defaults to agent's wallet)
   * @returns Swap result with transaction ID
   */
  async executeOkxSwap(
    fromTokenAddress: string,
    toTokenAddress: string,
    amount: string,
    slippage: string = "0.5",
    autoSlippage: boolean = false,
    maxAutoSlippageBps: string = "100",
    userWalletAddress?: string,
  ) {
    return executeOkxSwapTool(
      this,
      fromTokenAddress,
      toTokenAddress,
      amount,
      slippage,
      autoSlippage,
      maxAutoSlippageBps,
      userWalletAddress,
    );
  }
  /**
   * Get list of tokens supported by OKX DEX
   * @returns List of supported tokens
   */
  async getOkxTokens() {
    return getTokens(this);
  }

  /**
   * Get liquidity information from OKX DEX
   * @param chainId Chain ID to query liquidity for
   * @returns Liquidity data
   */
  async getOkxLiquidity(chainId: string) {
    return getLiquidity(this, chainId);
  }

  /**
   * Get chain data from OKX DEX
   * @returns Chain data
   */
  async getOkxChainData() {
    return getChainData(this);
  }

  /**
   * Create a limit order on Jupiter
   * @param params Parameters for creating the limit order
   * @returns Result of the limit order creation
   */
  async createJupiterLimitOrder(params: CreateJupiterOrderRequest) {
    return createLimitOrder(this, params);
  }

  /**
   * Cancel limit orders on Jupiter
   * @param params Parameters for canceling the orders
   * @returns Result of the order cancellation
   */
  async cancelJupiterLimitOrders(params: CancelJupiterOrderRequest) {
    return cancelLimitOrders(this, params);
  }

  /**
   * Get open limit orders on Jupiter
   * @returns List of open limit orders
   */
  async getOpenJupiterLimitOrders() {
    return getOpenLimitOrders(this);
  }

  /**
   * Get limit order history on Jupiter
   * @returns Limit order history
   */
  async getJupiterLimitOrderHistory() {
    return getLimitOrderHistory(this);
  }

  async getSanctumLSTPrice(mints: string[]) {
    return sanctumGetLSTPrice(mints);
  }

  async getSanctumLSTAPY(inputs: string[]) {
    return sanctumGetLSTAPY(inputs);
  }

  async getSanctumLSTTVL(inputs: string[]) {
    return sanctumGetLSTTVL(inputs);
  }

  async getSanctumOwnedLST() {
    return sanctumGetOwnedLST(this);
  }

  async addSanctumLiquidity(
    lstMint: string,
    amount: string,
    quotedAmount: string,
    priorityFee: number,
  ) {
    return sanctumAddLiquidity(
      this,
      lstMint,
      amount,
      quotedAmount,
      priorityFee,
    );
  }

  async removeSanctumLiquidity(
    lstMint: string,
    amount: string,
    quotedAmount: string,
    priorityFee: number,
  ) {
    return sanctumRemoveLiquidity(
      this,
      lstMint,
      amount,
      quotedAmount,
      priorityFee,
    );
  }

  async swapSanctumLST(
    inputLstMint: string,
    amount: string,
    quotedAmount: string,
    priorityFee: number,
    outputLstMint: string,
  ) {
    return sanctumSwapLST(
      this,
      inputLstMint,
      amount,
      quotedAmount,
      priorityFee,
      outputLstMint,
    );
  }
}
