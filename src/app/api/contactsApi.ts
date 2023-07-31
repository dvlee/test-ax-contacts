/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Contact } from "../../types/contact";
import { db } from "../firebase.ts";

export const contactsApi = createApi({
  reducerPath: "contacts",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    fetchContacts: builder.query({
      queryFn: async (uid: string) => {
        try {
          const q = query(
            collection(db, "contacts"),
            orderBy("name"),
            where("uid", "==", uid)
          );
          const querySnapshot = await getDocs(q);

          const data: any[] = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          return {
            data: {
              items: data,
              total: data.length,
            },
          };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
      providesTags: ["Contacts"],
    }),

    fetchSingleContact: builder.query({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, "contacts", id);
          const docSnap: DocumentSnapshot = await getDoc(docRef);

          if (docSnap.exists()) {
            return {
              data: {
                ...docSnap.data(),
                id: docSnap.id,
              } as Contact,
            };
          } else {
            throw { status: 404, message: "Контакт не найден" } as any;
          }
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: (_result, _error, { id }) => [{ type: "Contacts", id }],
    }),

    saveContact: builder.mutation({
      queryFn: async (values) => {
        try {
          const data = { ...values, timestamp: serverTimestamp() };

          return { data: { message: "Контакт успешно добавлен" } };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
      invalidatesTags: ["Contacts"],
    }),

    updateContact: builder.mutation({
      queryFn: async ({ id, ...values }) => {
        try {
          const docRef = doc(db, "contacts", id);
          await updateDoc(docRef, { ...values, timestamp: serverTimestamp() });
          return {
            data: {
              message: "Контакт успешно обновлен",
            },
          };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        "Contacts",
        { type: "Contacts", id },
      ],
    }),

    deleteContact: builder.mutation({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, "contacts", id);
          await deleteDoc(docRef);
          return {
            data: { message: "Контакт удален" },
          };
        } catch (error) {
          console.error(error);
          return { error };
        }
      },
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useSaveContactMutation,
  useFetchSingleContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
