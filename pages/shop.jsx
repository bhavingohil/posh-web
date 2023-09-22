import React from "react";
import Homestyles from "../styles/Home.module.css";
import ItemCard from "../components/ItemCard";
import SubscribeForm from "../components/subscribe/SubscribeForm";
import { useWindowWidth } from "../utils/useWindowWidth";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import Dropdown from "react-dropdown";
import ShopFilter from "../components/ShopFilter";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { useEffect } from "react";
import { useQuery } from "react-query";
import styles from "../styles/Shop.module.css";

const CategoryOptions = [
  "On Sale",
  "Handbags",
  "Dufflebags",
  "Jewelry",
  "Accessories",
  "Women's Shoes",
  "Women's Sneakers",
  "Women's Clothing",
];
const DesignersOptions = [
  "Alexander McQueen",
  "Balenciaga",
  "Bottega Veneta ",
  "Burberry",
  "Celine",
  "Chanel",
  "Chloe",
  "Christian Dior",
  "Dolce and Gabbana",
  "Fendi",
  "Givenchy",
  "Goyard",
  "Gucci",
  "Hermes",
  "Louis Vuitton",
  "Miu Miu",
  "Moschino",
  "Prada",
  "Yves Saint Laurent",
  "Stella McCartney",
  "Valentino",
  "Versace",
];
const MaterialOptions = [
  "Beaded",
  "Canvas Coated",
  "Embossed Leather",
  "Exotic",
  "Fabric",
  "Faux Fur",
  "Fur",
  "Leather",
  "Metal",
  "Nylon",
  "Patent Leather",
  "Raffia",
  "Satin",
  "Sequins",
  "Shearling",
  "Snakeskin",
  "Tweed",
  "Velvet",
  "Vinyl",
];
const SortingOptions = [
  "Low to High",
  "High to Low",
  "New to Old",
  "Old to New",
];

const ColorOptions = [
  "Black",
  "Blue",
  "Brown",
  "Gold",
  "Gray",
  "Green",
  "Metallic",
  "Multicolor",
  "Neutral",
  "Orange",
  "Pink",
  "Print",
  "Purple",
  "Red",
  "Silver",
  "White",
  "Yellow",
];

export default function shop({ setBasketOpen }) {
  const innerWidth = useWindowWidth();
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(12);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState("");
  const [priceFilter, setPriceFilter] = useState();
  const [sortOption, setSortOption] = useState({
    option: "",
    optionName: "",
    setReverse: false,
  });
  const [filters, setFilters] = useState({
    designer: "",
    material: "",
    category: "",
  });

  const {
    data: products,
    refetch,
    isFetching,
    isFetched,
  } = useQuery("Products", async () => {
    const res = await fetch("/api/getProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        filters,
        categories,
        sortOption,
        colors,
        priceFilter,
      }),
    });
    return await res.json();
  });

  const filter = (value) => {
    setCategories([...categories, value]);
  };

  const deleteFilter = (value) => {
    let index = categories.indexOf(value);
    if (index > -1) {
      let temp = [...categories];
      temp.splice(index, 1);
      setCategories(temp);
    }
  };

  const handleColorChange = (e) => {
    if (e === colors) setColors("");
    else setColors(e);
  };

  useEffect(() => {
    refetch();
  }, [filters, sortOption, colors, categories]);

  return (
    <div className={Homestyles.container}>
      <div className={styles.shopItemsContainer}>
        {innerWidth < 900 && (
          <div className={styles.mobileFilters}>
            <h1 onClick={() => setFilterOpen((prev) => !prev)}>
              <span>
                <AiOutlineDown
                  size={30}
                  style={{
                    transform: `rotate(${filterOpen ? "180deg" : "0deg"})`,
                    transition: "transform 200ms ease",
                    marginTop: -30,
                  }}
                />
              </span>
              Filters
            </h1>
            {filterOpen && (
              <hr
                style={{
                  width: "90%",
                  height: 1,
                  margin: "0 auto",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
            )}

            {filterOpen && (
              <div style={{ paddingBottom: filterOpen ? "3%" : "1%" }}>
                <div className={styles.dropdownContainers}>
                  {!colors ? (
                    <Dropdown
                      className="dropdown-filter"
                      placeholderClassName={styles.placeholderFilter}
                      menuClassName="control-filter"
                      options={ColorOptions}
                      placeholder="Color"
                      onChange={(e) => handleColorChange(e.value)}
                    />
                  ) : (
                    <div
                      className={styles.filterChosen}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p className={styles.placeholderFilter}>{colors}</p>
                      <AiOutlineClose
                        style={{ marginLeft: 20 }}
                        onClick={() => {
                          handleColorChange("");
                        }}
                      />
                    </div>
                  )}
                  {!filters.designer ? (
                    <Dropdown
                      className="dropdown-filter"
                      placeholderClassName={styles.placeholderFilter}
                      menuClassName="control-filter"
                      options={DesignersOptions}
                      placeholder="Designers"
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, designer: e.value }))
                      }
                    />
                  ) : (
                    <div
                      className={styles.filterChosen}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p className={styles.placeholderFilter}>
                        {filters.designer}
                      </p>
                      <AiOutlineClose
                        style={{ marginLeft: 20 }}
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, designer: "" }));
                        }}
                      />
                    </div>
                  )}
                  {!filters.material ? (
                    <Dropdown
                      className="dropdown-filter"
                      placeholderClassName={styles.placeholderFilter}
                      menuClassName="control-filter"
                      options={MaterialOptions}
                      placeholder="Material"
                      onChange={(e) => {
                        setFilters((prev) => ({ ...prev, material: e.value }));
                      }}
                    />
                  ) : (
                    <div
                      className={styles.filterChosen}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p className={styles.placeholderFilter}>
                        {filters.material}
                      </p>
                      <AiOutlineClose
                        style={{ marginLeft: 20 }}
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, material: "" }));
                        }}
                      />
                    </div>
                  )}
                  {!filters.category ? (
                    <Dropdown
                      className="dropdown-filter"
                      placeholderClassName={styles.placeholderFilter}
                      menuClassName="control-filter"
                      options={CategoryOptions}
                      onChange={(e) => {
                        setFilters((prev) => ({ ...prev, category: e.value }));
                      }}
                      placeholder="Category"
                    />
                  ) : (
                    <div
                      className={styles.filterChosen}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p className={styles.placeholderFilter}>
                        {filters.category}
                      </p>
                      <AiOutlineClose
                        style={{ marginLeft: 20 }}
                        onClick={() => {
                          setFilters((prev) => ({ ...prev, category: "" }));
                        }}
                      />
                    </div>
                  )}
                  {!sortOption.option.length ? (
                    <Dropdown
                      className="dropdown-filter"
                      placeholderClassName={styles.placeholderFilter}
                      menuClassName="control-filter"
                      options={SortingOptions}
                      onChange={(e) => {
                        switch (e.value) {
                          case "Low to High":
                            return setSortOption(() => ({
                              option: "PRICE",
                              optionName: e.value,
                              setReverse: false,
                            }));
                          case "High to Low":
                            return setSortOption(() => ({
                              option: "PRICE",
                              optionName: e.value,
                              setReverse: true,
                            }));
                            case "New to Old":
                              return setSortOption(() => ({
                                option: "CREATED_AT",
                                optionName: e.value,
                                setReverse: true,
                              }));
                            case "Old to New":
                              return setSortOption(() => ({
                                option: "CREATED_AT",
                                optionName: e.value,
                                setReverse: false,
                              }));
                        }
                      }}
                      placeholder="Default Sorting"
                    />
                  ) : (
                    <div
                      className={styles.filterChosen}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <p className={styles.placeholderFilter}>
                        {sortOption?.optionName}
                      </p>
                      <AiOutlineClose
                        style={{ marginLeft: 20 }}
                        onClick={() => {
                          setSortOption(() => ({
                            option: "",
                            optionName: "",
                            setReverse: false,
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
                <ShopFilter
                  price={priceFilter}
                  setPrice={(e) => setPriceFilter(e)}
                  filter={filter}
                  deleteFilter={deleteFilter}
                  filterByPrice={refetch}
                />
              </div>
            )}
          </div>
        )}
        <div className="shop-items-filter">
          {innerWidth > 900 && (
            <div className={styles.dropdownContainers}>
              {!colors ? (
                <Dropdown
                  className="dropdown-filter"
                  placeholderClassName={styles.placeholderFilter}
                  menuClassName="control-filter"
                  options={ColorOptions}
                  placeholder="Color"
                  onChange={(e) => handleColorChange(e.value)}
                />
              ) : (
                <div
                  className={styles.filterChosen}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p className={styles.placeholderFilter}>{colors}</p>
                  <AiOutlineClose
                    style={{ marginLeft: 20 }}
                    onClick={() => {
                      handleColorChange("");
                    }}
                  />
                </div>
              )}
              {!filters.designer ? (
                <Dropdown
                  className="dropdown-filter"
                  placeholderClassName={styles.placeholderFilter}
                  menuClassName="control-filter"
                  options={DesignersOptions}
                  placeholder="Designers"
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, designer: e.value }))
                  }
                />
              ) : (
                <div
                  className={styles.filterChosen}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p className={styles.placeholderFilter}>{filters.designer}</p>
                  <AiOutlineClose
                    style={{ marginLeft: 20 }}
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, designer: "" }));
                    }}
                  />
                </div>
              )}
              {!filters.material ? (
                <Dropdown
                  className="dropdown-filter"
                  placeholderClassName={styles.placeholderFilter}
                  menuClassName="control-filter"
                  options={MaterialOptions}
                  placeholder="Material"
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, material: e.value }));
                  }}
                />
              ) : (
                <div
                  className={styles.filterChosen}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p className={styles.placeholderFilter}>{filters.material}</p>
                  <AiOutlineClose
                    style={{ marginLeft: 20 }}
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, material: "" }));
                    }}
                  />
                </div>
              )}
              {!filters.category ? (
                <Dropdown
                  className="dropdown-filter"
                  placeholderClassName={styles.placeholderFilter}
                  menuClassName="control-filter"
                  options={CategoryOptions}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, category: e.value }));
                  }}
                  placeholder="Category"
                />
              ) : (
                <div
                  className={styles.filterChosen}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p className={styles.placeholderFilter}>{filters.category}</p>
                  <AiOutlineClose
                    style={{ marginLeft: 20 }}
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, category: "" }));
                    }}
                  />
                </div>
              )}
              {!sortOption.option.length ? (
                <Dropdown
                  className="dropdown-filter"
                  placeholderClassName={styles.placeholderFilter}
                  menuClassName="control-filter"
                  options={SortingOptions}
                  onChange={(e) => {
                    switch (e.value) {
                      case "Low to High":
                        return setSortOption(() => ({
                          option: "PRICE",
                          optionName: e.value,
                          setReverse: false,
                        }));
                      case "High to Low":
                        return setSortOption(() => ({
                          option: "PRICE",
                          optionName: e.value,
                          setReverse: true,
                        }));
                      case "New to Old":
                        return setSortOption(() => ({
                          option: "CREATED_AT",
                          optionName: e.value,
                          setReverse: true,
                        }));
                      case "Old to New":
                        return setSortOption(() => ({
                          option: "CREATED_AT",
                          optionName: e.value,
                          setReverse: false,
                        }));
                    }
                  }}
                  placeholder="Default Sorting"
                />
              ) : (
                <div
                  className={styles.filterChosen}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p className={styles.placeholderFilter}>
                    {sortOption?.optionName}
                  </p>
                  <AiOutlineClose
                    style={{ marginLeft: 20 }}
                    onClick={() => {
                      setSortOption(() => ({
                        option: "",
                        optionName: "",
                        setReverse: false,
                      }));
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        {innerWidth > 900 && (
          <ShopFilter
            price={priceFilter}
            setPrice={(e) => setPriceFilter(e)}
            filter={filter}
            deleteFilter={deleteFilter}
            filterByPrice={refetch}
          />
        )}

        {!isFetching && products && products?.length > 0 ? (
          <div style={{ paddingLeft: innerWidth > 900 ? 70 : 0 }}>
            <div className={styles.shopItems}>
              {products.map((bag, index) => (
                <ItemCard
                  setBasketOpen={setBasketOpen}
                  handle={bag.node?.handle}
                  key={index}
                  name={bag.node.title}
                  price={
                    bag.node.variants?.edges[0].node.price.amount ||
                    bag.node.variants?.edges[0].node.price
                  }
                  src={bag.node.featuredImage?.url}
                  id={bag.node.id}
                  totalInventory={bag.node.totalInventory}
                  variantId={bag.node.variants?.edges[0].node.id}
                  createdAt={bag.node.createdAt}
                />
              ))}
            </div>
            <button
              className={styles.shopViewBtn}
              onClick={() => {
                setPage((prev) => prev + 12);
                refetch();
              }}
            >
              View more
            </button>
          </div>
        ) : (
          <h1 className={styles.emptyWishlist}>
            {isFetched && "No items found"}
          </h1>
        )}
      </div>
      <div
        style={{
          paddingTop: products?.length > 0 ? 200 : "6n0vh",
          marginBottom: -50,
        }}
      >
        <SubscribeForm />
      </div>
      <Footer />
    </div>
  );
}
