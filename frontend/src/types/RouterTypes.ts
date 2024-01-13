export interface UserRouteCreator {
  userId: string;
}

export interface CollectionRouteCreator extends UserRouteCreator {
  collectionId: string;
}

export interface ItemRouteCreator extends CollectionRouteCreator {
  itemId: string;
}

export interface SignUpRouteState {
  email?: string;
}
