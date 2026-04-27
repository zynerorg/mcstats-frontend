export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  ping: Scalars['String']['output'];
};

export type Player = {
  __typename?: 'Player';
  name: Scalars['String']['output'];
  playerUuid: Scalars['String']['output'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  categories: Array<Scalars['String']['output']>;
  category: Array<Stat>;
  items: Array<Scalars['String']['output']>;
  player: Array<Stat>;
  players: Array<Player>;
  stats: Array<Stat>;
};


export type QueryRootCategoryArgs = {
  filter?: InputMaybe<StatFilterInput>;
  name: Scalars['String']['input'];
};


export type QueryRootPlayerArgs = {
  filter?: InputMaybe<StatFilterInput>;
  playerUuid: Scalars['String']['input'];
};


export type QueryRootStatsArgs = {
  filter?: InputMaybe<StatsFilterInput>;
};

export type Stat = {
  __typename?: 'Stat';
  category: Scalars['String']['output'];
  playerUuid: Scalars['String']['output'];
  value: Scalars['Int']['output'];
  valueName: Scalars['String']['output'];
};

export type StatFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type StatsFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  item?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  playerUuid?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryQuery = { __typename?: 'QueryRoot', categories: Array<string> };

export type StatsQueryVariables = Exact<{
  filter?: InputMaybe<StatsFilterInput>;
}>;


export type StatsQuery = { __typename?: 'QueryRoot', stats: Array<{ __typename?: 'Stat', playerUuid: string, category: string, valueName: string, value: number }> };

export type ItemQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemQuery = { __typename?: 'QueryRoot', items: Array<string> };

export type PlayerQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayerQuery = { __typename?: 'QueryRoot', players: Array<{ __typename?: 'Player', name: string }> };
