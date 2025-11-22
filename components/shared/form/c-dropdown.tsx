import { Colors } from "@/constants/colors";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import CText from "../c-text";

interface Item {
  label: string;
  value: string;
}

interface Props {
  data: Item[];
  onSelect: (item: Item) => void;
  placeholder: string;
  labelStyle?: TextStyle;
  label: string;
  value?: string;
  error?: string;
}

const CDropDown = ({
  data,
  onSelect,
  placeholder,
  labelStyle,
  label,
  value,
  error,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Item | null>(
    data.find((el) => el.value == value) || null
  );

  useEffect(() => {
    setSelected(data.find((el) => el.value == value) || null);
  }, [value]);

  const handleSelect = (item: Item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <CText style={[styles.label, labelStyle]}>{label}</CText>

      <TouchableOpacity
        style={styles.triggerBox}
        onPress={() => setVisible((prev) => !prev)}
      >
        <CText style={selected ? styles.valueText : styles.placeholderText}>
          {selected ? selected.label : placeholder}
        </CText>
        {visible ? (
          <ChevronUp size={18} color={Colors.textSecondary} />
        ) : (
          <ChevronDown size={18} color={Colors.textSecondary} />
        )}
      </TouchableOpacity>

      {error && <CText style={styles.error}>{error}</CText>}

      <View
        style={
          visible ? styles.dropDownWrapper : styles.dropDownWrapperInActive
        }
      >
        <TouchableOpacity onPress={() => setVisible(false)}>
          <View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              contentContainerStyle={styles.dropDownListContainer}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <CText style={styles.dropDownListText}>{item.label}</CText>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CDropDown;

const styles = StyleSheet.create({
  label: { fontWeight: "semibold", fontSize: 15 },

  triggerBox: {
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeholderText: {
    color: Colors.textSecondary,
  },
  valueText: {
    color: Colors.text,
  },
  dropDownWrapper: {
    alignSelf: "flex-start",
    backgroundColor: Colors.muteBg,
    position: "absolute",
    top: "100%",
    zIndex: 100,
    left: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  dropDownWrapperInActive: {
    display: "none",
  },
  dropDownListContainer: {
    display: "flex",
    flexDirection: "column",
  },
  dropDownListText: {
    fontSize: 14,
    color: Colors.textSecondary,
    paddingVertical: 10,
  },
  error: {
    color: Colors.red,
    paddingVertical: 10,
    fontSize: 13,
  },
});
