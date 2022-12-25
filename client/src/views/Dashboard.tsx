import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOADING, LOGOUT } from "../constants/action.constants";
import { useGlobalState } from "../hooks/useGlobalState";
import { logout } from "../services/auth.service";
import { getProducts } from "../services/product.service";
import { NoPropComponent } from "../types/component.types";
import { Product } from "../types/resource.types";

const Dashboard: NoPropComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [globalState, dispatch] = useGlobalState();
  const navigate = useNavigate();

  const getProductsList = useCallback(async () => {
    try {
      const { data } = await getProducts(globalState.accessToken);
      if (data) setProducts(data?.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({ type: LOGOUT });
        return navigate("/auth/login");
      }
    }
  }, [dispatch, globalState.accessToken, navigate]);

  const logoutUser = async () => {
    try {
      dispatch({ type: LOADING, payload: true });
      await logout();
      dispatch({ type: LOGOUT });
      return navigate("/auth/login");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: LOADING, payload: false });
    }
  };

  useEffect(() => {
    getProductsList();
  }, [getProductsList]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex ...">
          <div className="grow">
            <h4 className="text-2xl font-semibold text-gray-800">Dashboard</h4>
          </div>
          <div className="grow-0">
            <button
              onClick={logoutUser}
              className="tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full px-6 py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-xl font-semibold text-gray-600">Products : </h4>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.image}
                    alt={product.image}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {" "}
                    {product.price}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
