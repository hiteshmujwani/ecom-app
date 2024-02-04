import React from "react";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import "../styles/Home.css";
import { capitalize } from "@mui/material";
import toast from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/more-product/${page}`
    );
    setProducts([...products, ...res.data.products]);
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const totalProduct = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/product-total`
    );
    setTotal(res.data.total);
  };

  useEffect(() => {
    getCategories();
    totalProduct();
  }, []);

  //getting all products
  const allProducts = async () => {
    const res = await axios.get(
      `/api/v1/product/more-product/${page}`
    );
    setProducts(res.data.products);
  };

  //useEffect for calling function when this components render
  useEffect(() => {
    if (!checked.length || !radio.length) allProducts();
  }, [checked.length, radio.length]);

  const filterProduct = async () => {
    try {
      const res = await axios.post(
        `/api/v1/product/filter-product`,
        { checked, radio }
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  return (
    <Layout tittle="Home - shop now">
      <div className="row mt-2">
        <div className="col-md-2 text-center flex flex-col align-items-left">
        <div className="border">
          <h3 className="font-bold border-b-2 border-t-2 text-xl p-2">Filter By Category</h3>
          <div className="d-flex flex-column">
            <div className="checkbox-wrapper font-medium flex flex-col gap-2 p-3">
              {categories && categories.map((cat)=>(
                <>
              <input id={cat._id} name="checkbox" type="checkbox" onChange={(e)=>handleFilter(e.target.checked,cat._id)}/>
              <label className="terms-label" htmlFor={cat._id} >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 200 200"
                  className="checkbox-svg"
                >
                  <mask fill="white" id="path-1-inside-1_476_5-37">
                    <rect height={200} width={200} />
                  </mask>
                  <rect
                    mask="url(#path-1-inside-1_476_5-37)"
                    strokeWidth={40}
                    className="checkbox-box"
                    height={200}
                    width={200}
                  />
                  <path
                    strokeWidth={15}
                    d="M52 111.018L76.9867 136L149 64"
                    className="checkbox-tick"
                  />
                </svg>
                <span className="label-text">{cat.name}</span>
              </label>
              </>))}
            </div>
          </div>
          </div>
          <div className="border">
          <h3 className="font-bold border-b-2 border-t-2 text-xl p-2">Filter By Price</h3>
              <div className="container">
                <form>
                  {Prices.map((p) => (
                    <label key={p._id}>
                      <input
                        type="radio"
                        name="radio"
                        onChange={(e) => setRadio(e.target.value)}
                        value={p.array}
                      />
                      <span>{p.name}</span>
                    </label>
                  ))}
                </form>
              </div>
              </div>
            <button
              className="mt-2 bg-danger p-2 font-medium text-white"
              onClick={() => {
                window.location.reload();
              }}
            >
              Remove Filter
            </button>
        </div>
        <div className="col-md-9 gap-4 flex flex-column align-items-center">
        <div className="d-flex flex-wrap gap-3">
          {products &&
            products.map((p) => (
               
              <div className="card">
                <Link to={`/product-details/${p.slug}`} className="card-img">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.slug}
                  />
                </Link>
                <div className="card-info">
                  <p className="text-xl font-bold">{p.name.substring(0,20)}...</p>
                  <p className="text-body">
                    {p.description.substring(0, 30)}...
                  </p>
                </div>
                <div className="card-footer">
                  <span className="text-xl font-medium flex gap-3">
                    ${p.price}
                    <p className="line-through text-danger">
                      ${p.price + (p.price * 40) / 100}
                    </p>
                  </span>
                  <div
                    className="card-button"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("ITEM ADDED TO CART")
                    }}
                  >
                    <svg className="svg-icon" viewBox="0 0 20 20">
                      <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z" />
                      <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z" />
                      <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z" />
                    </svg>
                  </div>
                </div>
              </div>
            
            ))}
            </div>
            <div>
          {products && products.length < total && (
            <button
              className="btn mb-4"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              <svg
                height={24}
                width={24}
                fill="#FFFFFF"
                viewBox="0 0 24 24"
                data-name="Layer 1"
                id="Layer_1"
                className="sparkle"
              >
                <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
              </svg>
              <span className="text">MORE</span>
            </button>

          )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
