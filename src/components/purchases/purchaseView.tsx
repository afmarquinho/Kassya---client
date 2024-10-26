"use client";
import { purchaseStore } from "@/src/utils/purchaseStore";
import { Lock, LockOpen, X } from "lucide-react";
import ClosePurchaseModal from "./closePurchaseModal";
import DeletePurchaseModal from "../customers/deletePurchaseModal";

const PurchaseView = () => {
  const {
    purchaseDetails: purchase,
    toggleClosePurchaseModal,
    isClosePurchaseModalOpen,
    toggleDeletePurchaseModal,
   isDeletePurchaseModalOpen,
  } = purchaseStore();

  if (!purchase) {
    return (
      <div className={`text-base italic font-semibold`}>
        No has seleccionado una compra visualizar.
      </div>
    );
  }
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
                <td className={`p-3`}>{purchase.Purchase_id}</td>
              </tr>
              <tr>
                <th className={`italic`}>Descripcion</th>
                <td className={`p-3`}>{purchase?.Purchase_description}</td>
              </tr>
              <tr>
                <th className={`italic`}>Fecha</th>
                <td className={`p-3`}>Fecha</td>
              </tr>
              <tr>
                <th className={`italic`}>Fecha de Vencimiento</th>
                <td className={`p-3`}>Fecha de Vencimiento</td>
              </tr>

              <tr>
                <th className={`italic`}>Término de pago</th>
                <td className={`p-3`}>{purchase?.Purchase_paymentMethod}</td>
              </tr>
              <tr>
                <th className={`italic`}>Estado</th>
                <td className={`p-3`}>
                  <div className={`flex gap-2 items-center justify-start`}>
                    {purchase?.Purchase_close ? (
                      <Lock className={`w-5`} />
                    ) : (
                      <LockOpen className={`w-5`} />
                    )}
                    {purchase?.Purchase_close ? "Cerrada" : "Abierta"}
                  </div>
                </td>
              </tr>
              <tr>
                <th className={`italic`}>Monto</th>
                <td className={`p-3 font-bold`}>
                  {" "}
                  ${" "}
                  {purchase?.Purchase_totalAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
              <tr>
                <th className={`italic`}>Creado por</th>
                <td className={`p-3`}>
                  {purchase?.User.User_name} {purchase?.User.User_surname}
                </td>
              </tr>
            </tbody>
          </table>
          {!purchase.Purchase_close && (
            <button
              className={`p-2 bg-gradient-to-b from-indigo-600 to-indigo-600 text-white`}
            >
              Agregar Item
            </button>
          )}
        </div>

        <h2 className={`font-bold text-center text-base uppercase pb`}>
          Items
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}>
          {purchase.Product.map((product, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-slate-900 shadow-lg p-5 w-full hover:bg-blue-200 dark:hover:bg-slate-600 relative`}
            >
              {!purchase.Purchase_close && (
                <button
                  className={`absolute flex gap-2 right-2 top-2 text-xs items-center justify-center bg-gradient-to-b from-red-500 dark:from-yellow-500 to-red-600 dark:to-yellow-600 text-white dark:text-black px-1`}
                >
                  <X /> Eliminar
                </button>
              )}

              <table className={`text-left`}>
                <tbody>
                  <tr>
                    <th className={`pe-24`}>Rerencia</th>
                    <td>{product.Product_ref}</td>
                  </tr>
                  <tr>
                    <th>Nombre</th>
                    <td>{product.Product_name}</td>
                  </tr>
                  <tr>
                    <th>Descripción</th>
                    <td>{product.Product_description}</td>
                  </tr>
                  <tr>
                    <th>Costo</th>
                    <td>{product.Product_cost}</td>
                  </tr>
                  <tr>
                    <th>Cantidad</th>
                    <td>{product.Product_qty}</td>
                  </tr>
                  <tr>
                    <th>TOTAL</th>
                    <td>{product.Product_cost * product.Product_qty}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
        {!purchase.Purchase_close && (
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
                className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors bg-red-600 hover:bg-red-800
                `}
                onClick={toggleClosePurchaseModal}
              >
                <Lock className={`w-5`} />
                Cerrar Compra
              </button>
              <button
                className={`flex gap-1 justify-center items-center  rounded-md px-2 py-1 text-white transition-colors bg-black
              `}
                onClick={toggleDeletePurchaseModal}
              >
                <Lock className={`w-5`} />
                Eliminar Compra
              </button>
            </div>
          </div>
        )}
      </div>
      {isClosePurchaseModalOpen && <ClosePurchaseModal />}
      {isDeletePurchaseModalOpen && <DeletePurchaseModal />}
    </>
  );
};
export default PurchaseView;
