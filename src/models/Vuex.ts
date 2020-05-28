export type VuexMutationPayloads<Mutations = { [K: string]: object }> = {
  [MutationType in keyof Mutations]: Mutations[MutationType];
};

export type VuexActionPayloads<
  Actions = {
    [K: string]: any;
  }
> = { [ActionName in keyof Actions]: Actions[ActionName] };

export type VuexActions<P extends VuexActionPayloads, R = any> = {
  [K in keyof P]: (payload?: P[K]) => Promise<R>;
};
