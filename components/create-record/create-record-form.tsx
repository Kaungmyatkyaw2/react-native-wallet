import CButton from "@/components/shared/form/c-button";
import CDropDown from "@/components/shared/form/c-dropdown";
import CInput from "@/components/shared/form/c-input";
import { Colors } from "@/constants/colors";
import { RecordTypes } from "@/constants/record-types";
import { CreateRecordSchema, CreateRecordType } from "@/schema/record.schema";
import {
  createRecord,
  getAvailableCategories,
  getPayments,
} from "@/services/supabase.services";
import { RecordType } from "@/types/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

const CreateRecordForm = () => {
  const { type } = useLocalSearchParams();

  const {
    reset: formReset,
    control,
    handleSubmit,
    watch,
  } = useForm({
    resolver: zodResolver(CreateRecordSchema),
  });
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const selectedType = watch("type");

  const {
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    data: categoriesData,
  } = useQuery({
    queryKey: ["categories", selectedType],
    enabled: !!selectedType,
    queryFn: () => getAvailableCategories(selectedType as RecordType),
  });

  const {
    isLoading: isLoadingPaymentMethods,
    isError: isErrorPaymentMethods,
    data: paymentData,
  } = useQuery({
    queryKey: ["payments", selectedType],
    queryFn: () => getPayments(),
  });

  useEffect(() => {
    formReset({ type: (type as string) || undefined });
  }, [type]);

  const formattedCategories =
    !isLoadingCategories &&
    !isErrorCategories &&
    categoriesData?.map((el) => ({ label: el.name, value: el.id.toString() }));

  const formattedPayments =
    !isLoadingPaymentMethods &&
    !isErrorPaymentMethods &&
    paymentData?.map((el) => ({ label: el.name, value: el.id.toString() }));

  const onSubmit = async (formData: CreateRecordType) => {
    try {
      setLoading(true);

      await createRecord({
        amount: formData.amount,
        category_id: Number(formData.category_id),
        title: formData.title,
        type: formData.type as RecordType,
        payment_method_id: Number(formData.payment_method_id),
      });

      Toast.show({
        type: "success",
        text1: "Successfully created the record",
      });
      queryClient.invalidateQueries({ queryKey: ["my-wallet"] });
      queryClient.invalidateQueries({ queryKey: ["my-records"] });
      queryClient.invalidateQueries({ queryKey: ["latest-records"] });
      formReset();
      router.back();
    } catch (error) {
      console.error("Error while creating record: ", error);
      Toast.show({
        type: "error",
        text1: (error as Error).message || "Failed to register the account",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 35,
        flexDirection: "column",
        gap: 30,
      }}
    >
      {!type && (
        <Controller
          control={control}
          rules={{ required: true }}
          name="type"
          render={({ field, fieldState }) => {
            return (
              <CDropDown
                data={RecordTypes}
                error={fieldState.error?.message}
                label="Type"
                placeholder="Select the type of record"
                labelStyle={styles.label}
                value={field.value}
                onSelect={(item) => {
                  field.onChange(item.value);
                }}
              />
            );
          }}
        />
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        name="title"
        render={({ field, fieldState }) => (
          <CInput
            label={`${selectedType == "INCOME" ? "Income" : "Expense"} Title`}
            placeholder="Title of your record"
            labelStyle={styles.label}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
            value={field.value}
            required
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="amount"
        render={({ field, fieldState }) => (
          <CInput
            label="Amount"
            placeholder="Amount of the record"
            keyboardType="number-pad"
            labelStyle={styles.label}
            onBlur={field.onBlur}
            onChangeText={(value) => {
              if (value === "") {
                field.onChange(null);
              } else {
                const numericValue = Number(value);
                field.onChange(isNaN(numericValue) ? 0 : numericValue);
              }
            }}
            error={fieldState.error?.message}
            value={field.value?.toString()}
            required
          />
        )}
      />

      <Controller
        control={control}
        rules={{ required: true }}
        name="payment_method_id"
        render={({ field, fieldState }) => (
          <CDropDown
            data={formattedPayments || []}
            error={fieldState.error?.message}
            label="Payment Method"
            placeholder="Select the payment of record"
            labelStyle={styles.label}
            value={field.value}
            onSelect={(item) => {
              field.onChange(item.value);
            }}
          />
        )}
      />

      {!!selectedType && (
        <Controller
          control={control}
          rules={{ required: true }}
          name="category_id"
          render={({ field, fieldState }) => (
            <CDropDown
              data={formattedCategories || []}
              error={fieldState.error?.message}
              label="Category"
              placeholder="Select the category of record"
              labelStyle={styles.label}
              value={field.value}
              onSelect={(item) => {
                field.onChange(item.value);
              }}
            />
          )}
        />
        // <Controller
        //   control={control}
        //   rules={{ required: true }}
        //   name="category_id"
        //   render={({ field, fieldState }) => (
        //     <SelectCategoryList
        //       error={fieldState.error?.message}
        //       value={field.value}
        //       onSelect={(item) => {
        //         field.onChange(item.value);
        //       }}
        //       data={formattedCategories || []}
        //     />
        //   )}
        // />
      )}

      <CButton
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        isLoading={loading}
      >
        ADD {selectedType}
      </CButton>
    </View>
  );
};

export default CreateRecordForm;

const styles = StyleSheet.create({
  label: {
    fontFamily: "StackSans-SemiBold",
    color: Colors.textSecondary,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 12,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,

    backgroundColor: Colors.white,
  },
});
