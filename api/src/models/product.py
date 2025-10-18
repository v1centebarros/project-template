from sqlmodel import Field, SQLModel


class Product(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    description: str | None = None
    price: float
    in_stock: bool = True


class ProductCreate(SQLModel):
    name: str
    description: str | None = None
    price: float
    in_stock: bool = True

class ProductUpdate(SQLModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    in_stock: bool | None = None

    

