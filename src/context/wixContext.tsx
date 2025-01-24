"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";

import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

const wixClient = createClient({
    modules: {
      products,
      collections,
    //   currentCart
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken, accessToken: { value: "", expiresAt: 0 }, 
      },
    }),
  });

  export type WixClient = typeof wixClient;

  export const WixClientContext = createContext<WixClient>(wixClient);

  export const WixClientContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <WixClientContext.Provider value={wixClient}>{children}</WixClientContext.Provider>
    )
  }

//   import { products } from '@wix/stores';
//   import { createClient, OAuthStrategy } from '@wix/sdk';
  
//   //To access the Wix APIs, create a client with the createClient() function imported from the @wix/sdk package.
//   const myWixClient = createClient({
//     modules: { products },
//     auth: OAuthStrategy({ clientId: 'cbce56d0-725d-4ceb-91fe-6cfe8637e2cb' }),
//   });
  
//   const productList = await myWixClient.products.queryProducts().find();
  
//   console.log('My Products:');
//   console.log('Total: ', productList.items.length);
//   console.log(productList.items
//     .map((item) => item.name)
//     .join('\n')
//   );
