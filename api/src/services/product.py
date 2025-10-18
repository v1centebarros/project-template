
from sqlmodel import Session, select

from src.models.product import Product, ProductCreate, ProductUpdate, ProductUpdate


class ProductService:

    def get_products(self, *, session: Session, skip: int = 0, limit: int = 100):
        return session.exec(select(Product).offset(skip).limit(limit)).all()
    
    
    def get_product(self, *, session: Session, product_id: int):
        return session.get(Product, product_id)

    def create_product(self, *, session: Session, product: ProductCreate):
        db_product = Product.model_validate(product)
        session.add(db_product)
        session.commit()
        session.refresh(db_product)
        return db_product
    
    def update_product(self, *, session: Session, product_id: int, product: ProductUpdate):
        db_product = session.get(Product, product_id)
        if not db_product:
            return None
        update_data = product.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_product, key, value)
        session.add(db_product)
        session.commit()
        session.refresh(db_product)
        return db_product

    def delete_product(self, *, session: Session, product_id: int):
        db_product = session.get(Product, product_id)
        if not db_product:
            return None
        session.delete(db_product)
        session.commit()
        return db_product