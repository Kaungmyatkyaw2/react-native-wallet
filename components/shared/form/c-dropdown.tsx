import { useTheme } from "@/contexts/theme.context";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
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
  labelStyle?: TextStyle | TextStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  triggerStyle?: ViewStyle | ViewStyle[];
  dropdownStyle?: ViewStyle | ViewStyle[];
  label: string;
  value?: string;
  error?: string;
}

const CDropDown = ({
  data,
  onSelect,
  placeholder,
  labelStyle,
  containerStyle,
  triggerStyle,
  dropdownStyle,
  label,
  value,
  error,
}: Props) => {
  const { colors } = useTheme();
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
    <View style={[containerStyle]}>
      <CText
        style={[styles.label, { color: colors.text.secondary }, labelStyle]}
      >
        {label}
      </CText>

      <TouchableOpacity
        style={[
          styles.triggerBox,
          {
            borderColor: colors.border.primary,
            backgroundColor: colors.background.primary,
          },
          triggerStyle,
        ]}
        onPress={() => setVisible((prev) => !prev)}
      >
        <CText
          style={[
            selected ? styles.valueText : styles.placeholderText,
            { color: selected ? colors.text.primary : colors.text.muted },
          ]}
        >
          {selected ? selected.label : placeholder}
        </CText>
        {visible ? (
          <ChevronUp size={18} color={colors.text.secondary} />
        ) : (
          <ChevronDown size={18} color={colors.text.secondary} />
        )}
      </TouchableOpacity>

      {error && (
        <CText style={[styles.error, { color: colors.status.red }]}>
          {error}
        </CText>
      )}

      <View
        style={[
          visible ? styles.dropDownWrapper : styles.dropDownWrapperInActive,
          {
            backgroundColor: colors.background.muted,
          },
          dropdownStyle,
        ]}
      >
        <TouchableOpacity onPress={() => setVisible(false)}>
          <View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              contentContainerStyle={styles.dropDownListContainer}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <CText
                    style={[
                      styles.dropDownListText,
                      { color: colors.text.secondary },
                    ]}
                  >
                    {item.label}
                  </CText>
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
  label: {
    fontWeight: "semibold",
    fontSize: 15,
  },

  triggerBox: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeholderText: {},
  valueText: {},
  dropDownWrapper: {
    alignSelf: "flex-start",
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
    paddingVertical: 10,
  },
  error: {
    paddingVertical: 10,
    fontSize: 13,
  },
});
