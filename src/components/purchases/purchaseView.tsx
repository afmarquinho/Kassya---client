"use client";
import { purchaseStore } from "@/src/utils/purchaseStore";
import { Lock, LockOpen } from "lucide-react";
import ClosePurchaseModal from "./closePurchaseModal";
import DeletePurchaseModal from "../customers/deletePurchaseModal";
import { productStore } from "@/src/utils/productStore";
import AddProductModal from "../products/addProductModal";
import ProductCard from "../products/productCard";
import DeleteProductModal from "../products/deleteProductModal";
import { desformatearFecha } from "@/src/utils/helpers";

const PurchaseView = () => {
  const {
    purchaseDetails,
    toggleClosePurchaseModal,
    isClosePurchaseModalOpen,
    toggleDeletePurchaseModal,
    isDeletePurchaseModalOpen,
  } = purchaseStore();
  const { isProductModalOpen, toggleProductModal, isDeleteProductModalOpen } =
    productStore();

  if (!purchaseDetails) {
    return (
      <p className={`text-base italic font-semibold`}>
        No has seleccionado una compra visualizar.
      </p>
    );
  }

  const total = purchaseDetails.Product.reduce(
    (accumulator, product) =>
      accumulator + product.Product_cost * product.Product_qty,
    0
  );

  return (
    <>
      <div className={`space-y-5 mb-5`}>
        <div className={`bg-white dark:bg-slate-900 shadow-lg p-5`}>
          <h2 className={`font-bold text-center text-base uppercase`}>
            Detalle de la Compra
          </h2>
          <table border={1}>
            <tbody className={`text-left`}>
              <tr>
                <th className={`italic`}>Consecutivo</th>
                <td className={`p-3`}>{purchaseDetails.Purchase_id}</td>
              </tr>
              <tr>
                <th className={`italic`}>Descripcion</th>
                <td className={`p-3`}>
                  {purchaseDetails?.Purchase_description}
                </td>
              </tr>
              <tr>
                <th className={`italic`}>Fecha</th>
                <td className={`p-3`}>
                  {desformatearFecha(purchaseDetails.Purchase_date)}
                </td>
              </tr>
              <tr>
                <th className={`italic`}>Fecha de Vencimiento</th>
                <td className={`p-3`}>
                  {desformatearFecha(purchaseDetails.Purchase_dueDate)}
                </td>
              </tr>

              <tr>
                <th className={`italic`}>Término de pago</th>
                <td className={`p-3`}>
                  {purchaseDetails?.Purchase_paymentMethod}
                </td>
              </tr>
              <tr>
                <th className={`italic`}>Estado</th>
                <td className={`p-3`}>
                  <div className={`flex gap-2 items-center justify-start`}>
                    {purchaseDetails?.Purchase_close ? (
                      <Lock className={`w-5`} />
                    ) : (
                      <LockOpen className={`w-5`} />
                    )}
                    {purchaseDetails?.Purchase_close ? "Cerrada" : "Abierta"}
                  </div>
                </td>
              </tr>
              <tr>
                <th className={`italic`}>Monto</th>
                <td className={`p-3 font-bold`}>
                  {" "}
                  {" "}
                  {total.toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )}
                </td>
              </tr>
              <tr>
                <th className={`italic`}>Creado por</th>
                <td className={`p-3`}>
                  {purchaseDetails?.User.User_name}{" "}
                  {purchaseDetails?.User.User_surname}
                </td>
              </tr>
            </tbody>
          </table>
          {!purchaseDetails.Purchase_close && (
            <button
              className={`p-2 bg-gradient-to-b from-indigo-600 to-indigo-600 text-white`}
              onClick={toggleProductModal}
            >
              Agregar Item
            </button>
          )}
        </div>

        <h2 className={`font-bold text-center text-base uppercase pb`}>
          Items
        </h2>
        {purchaseDetails.Product.length === 0 ? (
          <p className={`text-base italic font-semibold`}>
            Esta órden aún no tiene productos asociados
          </p>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}
          >
            {purchaseDetails.Product.map((product) => (
              <ProductCard key={product.Product_id} product={product} />
            ))}
          </div>
        )}
        {!purchaseDetails.Purchase_close && (
          <div
            className={`w-full bg-red-600 bg-opacity-10 border-4 border-red-600 dark:border-red-300 p-5 `}
          >
            <p
              className={`text-red-600 dark:text-red-200 font-bold uppercase mb-2`}
            >
              Zona de Peligro
            </p>
            <div className={`flex gap-5`}>
              <button
                className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors  ${
                  purchaseDetails.Product.length < 1
                    ? "bg-gray-500"
                    : "bg-red-600 hover:bg-red-800"
                }
                `}
                disabled={purchaseDetails.Product.length < 1}
                onClick={toggleClosePurchaseModal}
              >
                <Lock className={`w-5`} />
                Cerrar Compra
              </button>
              <button
                className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors ${
                  purchaseDetails.Product.length > 0
                    ? "bg-gray-500"
                    : "bg-black"
                }
              `}
                disabled={purchaseDetails.Product.length > 0}
                onClick={toggleDeletePurchaseModal}
              >
                <Lock className={`w-5`} />
                Eliminar Compra
              </button>
            </div>
          </div>
        )}
      </div>
      {isProductModalOpen && <AddProductModal />}
      {isClosePurchaseModalOpen && <ClosePurchaseModal total={total}/>}
      {isDeletePurchaseModalOpen && <DeletePurchaseModal />}
      {isDeleteProductModalOpen && <DeleteProductModal />}
    </>
  );
};
export default PurchaseView;
