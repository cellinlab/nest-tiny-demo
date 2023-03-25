export class ListCatsDto {
  data: Array<Cat>;
  limit: number;
}

class Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
}
