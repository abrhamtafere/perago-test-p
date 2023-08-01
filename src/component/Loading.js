import { Loader } from "@mantine/core";
import React from "react";

export const Loading = () => {
  return <div className="flex flex-col items-center justify-center dmt-24 h-[90vh]">
  <Loader  size="xl" variant="bars" />
 <div className="mr-2">
  <span className="text-gray-600 text-lg font-medium">Loading...</span>
</div>
</div>;
};
