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
  maxHeight?: number; // Optional: custom max height
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
  maxHeight = 250,
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

  const calculateDropdownHeight = () => {
    const itemHeight = 50;
    const calculatedHeight = Math.min(data.length * itemHeight, maxHeight);
    return calculatedHeight;
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
        activeOpacity={0.8}
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

      {visible && (
        <View
          style={[
            styles.dropDownWrapper,
            {
              backgroundColor: colors.background.muted,
              borderColor: colors.border.primary,
              maxHeight: calculateDropdownHeight(),
              height: calculateDropdownHeight(),
            },
            dropdownStyle,
          ]}
        >
          <FlatList
            data={data}
            keyExtractor={(item) => item.value}
            contentContainerStyle={styles.dropDownListContainer}
            showsVerticalScrollIndicator={true}
            scrollEnabled={data.length > 0}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={[styles.dropDownItem]}
              >
                <CText
                  style={[
                    styles.dropDownListText,
                    {
                      color:
                        item.value === selected?.value
                          ? colors.text.primary
                          : colors.text.secondary,
                    },
                  ]}
                >
                  {item.label}
                </CText>
              </TouchableOpacity>
            )}
            initialNumToRender={10}
            maxToRenderPerBatch={20}
            windowSize={5}
          />
        </View>
      )}
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
    minHeight: 50,
  },
  placeholderText: {
    opacity: 0.7,
  },
  valueText: {
    fontWeight: "500",
  },
  dropDownWrapper: {
    position: "absolute",
    top: "100%",
    zIndex: 1000,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  dropDownListContainer: {
    flexGrow: 1,
  },
  dropDownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dropDownListText: {
    fontSize: 15,
  },
  error: {
    paddingVertical: 10,
    fontSize: 13,
  },
});
