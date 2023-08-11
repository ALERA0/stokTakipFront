import {
  addIncomingProductProcess,
  addOutgoingProductProcess,
  getIncomingProductDetailProcess,
  getMusteriOrdersProcess,
  getOrderDetailProcess,
  getOutgoingProductDetailProcess,
  getTedarikciOrdersProcess,
} from "@/src/api";
import { Button, Input } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { TextareaAutosize } from "@mui/material";
import { useRouter } from "next/router";

const defaultDocumentDate = new Date().toISOString().split("T")[0];

const BelgeOluşturma = () => {
  const [documentDate, setDocumentDate] = useState(defaultDocumentDate);
  const [documentNumber, setDocumentNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [description, setDescription] = useState("");
  const [orderName, setOrderName] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    dispatch(getTedarikciOrdersProcess());
    dispatch(getMusteriOrdersProcess());
  }, []);

  const tedarikciOrders = useSelector((state) => state.getTedarikciOrders.data);
  const musteriOrders = useSelector((state) => state.getMusteriOrders.data);
  const addIncomingProduct = useSelector(
    (state) => state.addIncomingProduct.data
  );
  const addOutgoingProduct = useSelector(
    (state) => state.addOutgoingProduct.data
  );

  const handleAddIncomingProductDoc = async () => {
    console.log(documentDate, "DOOOOOOCD DATEEEEE");
    console.log(pathname, "ASLKHKHLJASHJKLASHKJLASDKHJLASHJKLSAD");

    if (pathname === "/urunGiris") {
      await dispatch(
        addIncomingProductProcess({
          documentDate: documentDate,
          documentNumber: documentNumber,
          order: order,
          description: description,
        })
      );
      console.log(addIncomingProduct);

      await dispatch(
        getIncomingProductDetailProcess({
          incomingProductId: addIncomingProduct?._id,
        })
      );
    } else if (pathname === "/urunCikis") {
      await dispatch(
        addOutgoingProductProcess({
          documentDate: documentDate,
          documentNumber: documentNumber,
          order: order,
          description: description,
        })
      );
      console.log(addIncomingProduct);

      await dispatch(
        getOutgoingProductDetailProcess({
          outgoingProductId: addOutgoingProduct?._id,
        })
      );
    }

    router.push("/belgeDetay");
  };
  useEffect(() => {
    dispatch(getOrderDetailProcess({ _id: order }));
  }, [order]);

  const { data: OrderDetail } = useSelector((state) => state.orderDetail);

  useEffect(() => {
    if (OrderDetail) {
      setOrderName(OrderDetail.isim);
    } else {
      setOrderName(null);
    }
  }, [OrderDetail]);

  const options = pathname === "/urunGiris" ? tedarikciOrders : musteriOrders;

  return (
    <div className="h-full w-full bg-light rounded-lg pr-24 lg:pl-16 md:pl-8 pl-2 py-8 flex flex-col ">
      <h2 className="text-3xl font-bold mb-4 flex justify-center">
        Ürün {pathname === "/urunGiris" ? "Giriş" : "Çıkış"} Belgesi Oluşturma
      </h2>
      <div className=" w-full flex justify-around mt-6 m-4 ">
        <div className="flex gap-2">
          <p className="text-xl font-bold my-auto">Belge Tarihi : </p>
          <Input
            value={documentDate}
            className="w-52 text-center my-auto"
            type="Date"
            onChange={(e) => setDocumentDate(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold my-auto">Belge No : </p>
          <Input
            value={documentNumber}
            className="w-auto text-center my-auto"
            onChange={(e) => setDocumentNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full justify-around  ">
        <div className="flex gap-2">
          <p className="text-xl font-bold my-auto">Satıcı : </p>
          <div className="relative z-10 w-44">
            <Listbox value={order} onChange={setOrder}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {orderName ? orderName : "Satıcı Seç"}
                  </span>

                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options &&
                      options.map((option, optionIdx) => (
                        <Listbox.Option
                          key={optionIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={option._id}
                        >
                          {({ selected }) => (
                            <div className="flex items-center justify-between">
                              <div
                                className={`truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {option.isim}
                              </div>
                              {selected && (
                                <CheckIcon
                                  className="h-5 w-5 text-amber-600"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-xl font-bold my-auto">Belge Açıklaması : </p>
          <TextareaAutosize
            value={description}
            className="w-auto h-8 text-center  my-auto"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <Button
        type="primary"
        className="flex  w-36 text-center justify-center items-center mx-auto mt-8   bg-blue-900"
        onClick={handleAddIncomingProductDoc}
      >
        Belge Oluştur
      </Button>
    </div>
  );
};

export default BelgeOluşturma;
