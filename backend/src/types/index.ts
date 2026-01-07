/**
 * Virtual Card Shop - TypeScript Type Definitions
 * Comprehensive type definitions for all application entities
 */

// ============================================================================
// ENUMS
// ============================================================================

/**
 * User account status
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

/**
 * User account roles
 */
export enum UserRole {
  CUSTOMER = 'customer',
  SELLER = 'seller',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

/**
 * Card rarity levels
 */
export enum CardRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
  MYTHIC = 'mythic',
}

/**
 * Card condition grades
 */
export enum CardCondition {
  MINT = 'mint',
  NEAR_MINT = 'near_mint',
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
}

/**
 * Card set status
 */
export enum CardSetStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  RETIRED = 'retired',
  ARCHIVED = 'archived',
}

/**
 * Pack type categories
 */
export enum PackType {
  BOOSTER = 'booster',
  STARTER = 'starter',
  THEME = 'theme',
  COLLECTION = 'collection',
  SPECIAL = 'special',
}

/**
 * Transaction types
 */
export enum TransactionType {
  PURCHASE = 'purchase',
  SALE = 'sale',
  TRADE = 'trade',
  REFUND = 'refund',
  PACK_OPENING = 'pack_opening',
  INVENTORY_ADJUSTMENT = 'inventory_adjustment',
}

/**
 * Transaction status
 */
export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

/**
 * Payment methods
 */
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
  WALLET = 'wallet',
}

/**
 * Currency types
 */
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  AUD = 'AUD',
}

// ============================================================================
// USER TYPES
// ============================================================================

/**
 * User profile information
 */
export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  bio?: string;
  status: UserStatus;
  role: UserRole;
  phoneNumber?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isEmailVerified: boolean;
  isTwoFactorEnabled: boolean;
}

/**
 * User authentication credentials
 */
export interface UserCredentials {
  email: string;
  password: string;
}

/**
 * User registration data
 */
export interface UserRegistration {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

/**
 * User profile update payload
 */
export interface UpdateUserProfile {
  firstName?: string;
  lastName?: string;
  bio?: string;
  profileImageUrl?: string;
  phoneNumber?: string;
}

/**
 * User authentication token
 */
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

/**
 * Authenticated user context
 */
export interface AuthenticatedUser extends User {
  tokens: AuthToken;
}

// ============================================================================
// CARD TYPES
// ============================================================================

/**
 * Individual card entity
 */
export interface Card {
  id: string;
  cardSetId: string;
  name: string;
  description?: string;
  cardNumber: string;
  imageUrl: string;
  thumbnailUrl?: string;
  rarity: CardRarity;
  type: string;
  subtype?: string;
  attributes: Record<string, unknown>;
  stats?: CardStats;
  artist?: string;
  illustrationUrl?: string;
  releaseDate: Date;
  isHolo?: boolean;
  isSpecial?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Card statistics (e.g., for game cards)
 */
export interface CardStats {
  attack?: number;
  defense?: number;
  health?: number;
  speed?: number;
  ability?: string;
  weakness?: string;
  resistance?: string;
}

/**
 * Card copy with individual tracking (condition, serial number, etc.)
 */
export interface CardCopy {
  id: string;
  cardId: string;
  serialNumber?: string;
  condition: CardCondition;
  gradingScore?: number;
  gradingService?: string;
  purchasedAt: Date;
  purchasePrice: number;
  estimatedValue?: number;
  notes?: string;
}

/**
 * Card variant with specific print or edition
 */
export interface CardVariant {
  id: string;
  cardId: string;
  variantName: string;
  edition: string;
  printRun?: string;
  language: string;
  isFirstEdition: boolean;
  priceModifier: number;
}

// ============================================================================
// CARD SET TYPES
// ============================================================================

/**
 * Card set (collection of cards)
 */
export interface CardSet {
  id: string;
  name: string;
  symbol: string;
  description?: string;
  releaseDate: Date;
  setNumber?: string;
  totalCards: number;
  totalSecretCards?: number;
  logoUrl?: string;
  status: CardSetStatus;
  createdBy: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Card set with detailed card information
 */
export interface CardSetWithCards extends CardSet {
  cards: Card[];
}

/**
 * Card set statistics
 */
export interface CardSetStats {
  setId: string;
  totalCardsReleased: number;
  rareCardCount: number;
  commonCardCount: number;
  averageCardPrice: number;
  mostValuableCard: Card;
  totalValue: number;
}

// ============================================================================
// PACK TYPES
// ============================================================================

/**
 * Booster pack definition
 */
export interface Pack {
  id: string;
  name: string;
  description?: string;
  type: PackType;
  cardSetId: string;
  cardsPerPack: number;
  guaranteedRares: number;
  guaranteedHolos: number;
  price: number;
  currency: Currency;
  weight?: number;
  dimensions?: PackDimensions;
  releaseDate: Date;
  isAvailable: boolean;
  maxQuantityPerOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Pack dimensions
 */
export interface PackDimensions {
  width: number;
  height: number;
  depth: number;
  unit: 'cm' | 'inch';
}

/**
 * Pack opening result
 */
export interface PackOpeningResult {
  id: string;
  userId: string;
  packId: string;
  cardSetId: string;
  cardsObtained: Card[];
  totalValue: number;
  timestamp: Date;
  rarityBreakdown: Record<CardRarity, number>;
}

/**
 * Pack inventory item
 */
export interface PackInventoryItem {
  id: string;
  packId: string;
  quantity: number;
  locationId?: string;
  lastRestockedAt: Date;
}

// ============================================================================
// BOX TYPES
// ============================================================================

/**
 * Card box (contains multiple packs)
 */
export interface Box {
  id: string;
  name: string;
  description?: string;
  packType: PackType;
  cardSetId: string;
  packsPerBox: number;
  pricePerBox: number;
  currency: Currency;
  weight?: number;
  dimensions?: BoxDimensions;
  releaseDate: Date;
  isAvailable: boolean;
  manufacturer?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Box dimensions
 */
export interface BoxDimensions {
  width: number;
  height: number;
  depth: number;
  unit: 'cm' | 'inch';
}

/**
 * Box opening result
 */
export interface BoxOpeningResult {
  id: string;
  userId: string;
  boxId: string;
  packsOpened: PackOpeningResult[];
  totalCardsObtained: number;
  totalValue: number;
  timestamp: Date;
}

/**
 * Box inventory item
 */
export interface BoxInventoryItem {
  id: string;
  boxId: string;
  quantity: number;
  locationId?: string;
  lastRestockedAt: Date;
}

// ============================================================================
// INVENTORY TYPES
// ============================================================================

/**
 * User inventory - collection of owned cards
 */
export interface UserInventory {
  id: string;
  userId: string;
  totalCards: number;
  totalValue: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User inventory item - specific card copies
 */
export interface UserInventoryItem {
  id: string;
  inventoryId: string;
  cardCopyId: string;
  quantity: number;
  addedAt: Date;
  updatedAt: Date;
}

/**
 * Inventory statistics
 */
export interface InventoryStats {
  inventoryId: string;
  totalCards: number;
  uniqueCards: number;
  totalValue: number;
  valueByRarity: Record<CardRarity, number>;
  valueBySet: Record<string, number>;
  mostValuableCard: CardCopy;
  averageCardCondition: CardCondition;
}

/**
 * Inventory filter criteria
 */
export interface InventoryFilterCriteria {
  setId?: string;
  rarity?: CardRarity;
  condition?: CardCondition;
  searchTerm?: string;
  sortBy?: 'name' | 'value' | 'rarity' | 'date' | 'condition';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Wishlist item
 */
export interface WishlistItem {
  id: string;
  userId: string;
  cardId: string;
  targetCondition?: CardCondition;
  targetPrice?: number;
  addedAt: Date;
  priority?: number;
}

// ============================================================================
// TRANSACTION TYPES
// ============================================================================

/**
 * Transaction record
 */
export interface Transaction {
  id: string;
  transactionNumber: string;
  userId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: Currency;
  paymentMethod?: PaymentMethod;
  description?: string;
  items: TransactionItem[];
  subtotal: number;
  tax: number;
  shippingCost?: number;
  total: number;
  createdAt: Date;
  completedAt?: Date;
  failureReason?: string;
}

/**
 * Individual item in a transaction
 */
export interface TransactionItem {
  id: string;
  transactionId: string;
  itemType: 'card' | 'pack' | 'box';
  itemId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

/**
 * Purchase transaction details
 */
export interface PurchaseTransaction extends Transaction {
  type: TransactionType.PURCHASE;
  shippingAddress?: Address;
  trackingNumber?: string;
  estimatedDelivery?: Date;
}

/**
 * Sale transaction details
 */
export interface SaleTransaction extends Transaction {
  type: TransactionType.SALE;
  buyerId: string;
  shippingAddress?: Address;
}

/**
 * Trade transaction details
 */
export interface TradeTransaction extends Transaction {
  type: TransactionType.TRADE;
  traderId: string;
  itemsOffered: TransactionItem[];
  itemsRequested: TransactionItem[];
}

/**
 * Physical address
 */
export interface Address {
  id?: string;
  fullName: string;
  streetAddress: string;
  apartmentOrSuite?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault?: boolean;
}

/**
 * Payment information
 */
export interface PaymentInfo {
  id?: string;
  method: PaymentMethod;
  lastFour?: string;
  expiryDate?: string;
  billingAddress?: Address;
  isDefault?: boolean;
}

/**
 * Transaction filter criteria
 */
export interface TransactionFilterCriteria {
  type?: TransactionType;
  status?: TransactionStatus;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  currency?: Currency;
  sortBy?: 'date' | 'amount' | 'status';
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: Date;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

/**
 * Pagination metadata
 */
export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * API error details
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

/**
 * Validation error details
 */
export interface ValidationError extends ApiError {
  code: 'VALIDATION_ERROR';
  fields?: Record<string, string[]>;
}

/**
 * Authentication error response
 */
export interface AuthErrorResponse extends ApiError {
  code: 'AUTH_ERROR' | 'INVALID_TOKEN' | 'TOKEN_EXPIRED';
}

/**
 * User API responses
 */
export interface UserResponse extends ApiResponse<User> {}
export interface UsersListResponse extends PaginatedResponse<User> {}
export interface UserRegistrationResponse extends ApiResponse<AuthenticatedUser> {}
export interface UserLoginResponse extends ApiResponse<AuthenticatedUser> {}

/**
 * Card API responses
 */
export interface CardResponse extends ApiResponse<Card> {}
export interface CardsListResponse extends PaginatedResponse<Card> {}
export interface CardSetResponse extends ApiResponse<CardSet> {}
export interface CardSetsListResponse extends PaginatedResponse<CardSet> {}
export interface CardSetWithCardsResponse extends ApiResponse<CardSetWithCards> {}

/**
 * Pack API responses
 */
export interface PackResponse extends ApiResponse<Pack> {}
export interface PacksListResponse extends PaginatedResponse<Pack> {}
export interface PackOpeningResponse extends ApiResponse<PackOpeningResult> {}

/**
 * Box API responses
 */
export interface BoxResponse extends ApiResponse<Box> {}
export interface BoxesListResponse extends PaginatedResponse<Box> {}
export interface BoxOpeningResponse extends ApiResponse<BoxOpeningResult> {}

/**
 * Inventory API responses
 */
export interface InventoryResponse extends ApiResponse<UserInventory> {}
export interface InventoryItemsResponse extends PaginatedResponse<UserInventoryItem> {}
export interface InventoryStatsResponse extends ApiResponse<InventoryStats> {}
export interface WishlistResponse extends PaginatedResponse<WishlistItem> {}

/**
 * Transaction API responses
 */
export interface TransactionResponse extends ApiResponse<Transaction> {}
export interface TransactionsListResponse extends PaginatedResponse<Transaction> {}
export interface CreateTransactionResponse extends ApiResponse<Transaction> {}

/**
 * Bulk operation response
 */
export interface BulkOperationResponse<T> extends ApiResponse<T[]> {
  successCount: number;
  failureCount: number;
  failures?: BulkOperationFailure[];
}

/**
 * Bulk operation failure details
 */
export interface BulkOperationFailure {
  itemId: string;
  reason: string;
  error: ApiError;
}

/**
 * Health check response
 */
export interface HealthCheckResponse extends ApiResponse<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  version: string;
  timestamp: Date;
}> {}

/**
 * Search results response
 */
export interface SearchResponse<T> extends PaginatedResponse<T> {
  query: string;
  executionTimeMs: number;
  suggestedQueries?: string[];
}

// ============================================================================
// REQUEST PAYLOAD TYPES
// ============================================================================

/**
 * Create card payload
 */
export interface CreateCardPayload {
  cardSetId: string;
  name: string;
  cardNumber: string;
  imageUrl: string;
  rarity: CardRarity;
  type: string;
  subtype?: string;
  description?: string;
  artist?: string;
  attributes?: Record<string, unknown>;
  stats?: CardStats;
  isHolo?: boolean;
  isSpecial?: boolean;
}

/**
 * Update card payload
 */
export interface UpdateCardPayload extends Partial<CreateCardPayload> {}

/**
 * Create pack payload
 */
export interface CreatePackPayload {
  name: string;
  type: PackType;
  cardSetId: string;
  cardsPerPack: number;
  guaranteedRares: number;
  guaranteedHolos: number;
  price: number;
  currency: Currency;
  releaseDate: Date;
  description?: string;
  weight?: number;
  dimensions?: PackDimensions;
  maxQuantityPerOrder?: number;
}

/**
 * Purchase pack payload
 */
export interface PurchasePackPayload {
  packId: string;
  quantity: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  billingAddress?: Address;
}

/**
 * Create box payload
 */
export interface CreateBoxPayload {
  name: string;
  packType: PackType;
  cardSetId: string;
  packsPerBox: number;
  pricePerBox: number;
  currency: Currency;
  releaseDate: Date;
  description?: string;
  weight?: number;
  dimensions?: BoxDimensions;
  manufacturer?: string;
}

/**
 * Purchase box payload
 */
export interface PurchaseBoxPayload {
  boxId: string;
  quantity: number;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  billingAddress?: Address;
}

/**
 * Query parameters for list endpoints
 */
export interface ListQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, unknown>;
}
