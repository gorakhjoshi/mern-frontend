import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import moment from "moment";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { MessageResponse } from "../../types/ApiTypes";

type ResponseType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResponseType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const err = res.error as FetchBaseQueryError;
    const msg = (err.data as MessageResponse).message;
    toast.error(msg);
  }
};

export const getMonths = () => {
  let lastSixMonths: string[] = [];
  let lastTwelveMonths: string[] = [];
  //const date = moment();

  for (let index = 0; index < 6; index++) {
    lastSixMonths.unshift(moment().subtract(index, "months").format("MMMM"));
  }
  for (let index = 0; index < 12; index++) {
    lastTwelveMonths.unshift(moment().subtract(index, "months").format("MMMM"));
  }
  return { lastSixMonths, lastTwelveMonths };
};
