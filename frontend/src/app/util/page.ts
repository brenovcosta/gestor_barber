export class Page<T> {
  content: T[] = new Array<T>();
  last?: boolean;
  totalPages?: number;
  totalElements: number = 1;
  first?: boolean;
  numberOfElements: number = 1;
  sort?: string;
  size: number = 5;
  number?: number;
}
