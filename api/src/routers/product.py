

from itertools import product
from urllib import response
from fastapi import APIRouter, HTTPException

from src.core.deps import SessionDep
from src.models.product import Product, ProductCreate, ProductUpdate
from src.services.product import ProductService


router = APIRouter(prefix="/products", tags=["products"])
product_service = ProductService()

@router.get("/", response_model=list[Product])
def get_products(session: SessionDep, skip: int = 0, limit: int = 100):
  products = product_service.get_products(session=session, skip=skip, limit=limit)
  if not products:
    raise HTTPException(status_code=404, detail="No products found")
  return products

@router.get("/{product_id}", response_model=Product)
def get_product(product_id: int, session: SessionDep):
  product = product_service.get_product(session=session, product_id=product_id)
  if not product:
    raise HTTPException(status_code=404, detail="Product not found")
  return product

@router.post("/", response_model=ProductCreate, status_code=201)
def create_product(product: ProductCreate, session: SessionDep):
  return product_service.create_product(session=session, product=product)

@router.put("/{product_id}", response_model=Product)
def update_product(product_id: int, product: ProductUpdate, session: SessionDep):
  db_product = product_service.update_product(session=session, product_id=product_id, product=product)
  if not db_product:
    raise HTTPException(status_code=404, detail="Product not found")
  return db_product

@router.delete("/{product_id}", response_model=Product)
def delete_product(product_id: int,  session: SessionDep):
  db_product = product_service.delete_product(session=session, product_id=product_id)
  if not db_product:
    raise HTTPException(status_code=404, detail="Product not found")
  return db_product