import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import {
  useRecoilCurrency,
  useRecoilCategories,
  useRecoilStore,
  useRecoilDefaultCurrency,
  useRecoilCart,
  useRecoilUtility,
} from "../stateManager/recoil";
import { gql } from "@apollo/client";
import { useEffect } from "react";

export const queryHoc = (WrappedComponent) => {
  function QueryHoc() {
    const load_data = gql`
      query {
        categories {
          name
        }
        category(input: { title: "all" }) {
          name
          products {
            id
            name
            gallery
            attributes {
              name
              items {
                displayValue
                value
              }
            }
            prices {
              currency {
                symbol
                label
              }
              amount
            }
          }
        }
        currencies {
          label
          symbol
        }
      }
    `;

   
    const { data } = useQuery(load_data);
    const [, setStore] = useRecoilStore();
    useEffect(() => {
      if (data) {
        const _data = JSON.parse(JSON.stringify(data));
        _data?.category?.products.forEach((element) => {
          element.prices.forEach((_element) => {
            _element.initialAmount = _element.amount;
          });
        });
        setStore(_data?.category);
      }
    }, [data, setStore]);
    return (
      <>
        <WrappedComponent
          useQuery={useQuery(load_data)}
          useRecoilCurrency={useRecoilCurrency()}
          useRecoilCategories={useRecoilCategories()}
          useRecoilStore={useRecoilStore()}
          useRecoilDefaultCurrency={useRecoilDefaultCurrency()}
          useRecoilCart={useRecoilCart()}
          useRecoilUtility={useRecoilUtility()}
          search={useParams()}
          history={useNavigate()}
        />
      </>
    );
  }
  return QueryHoc;
};
