import { ThemeMode } from "@/constants/themes";
import { useTheme } from "@/contexts/theme.context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Check, Moon, Sun } from "lucide-react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CText from "../shared/c-text";

const themes = [
  {
    id: "light" as ThemeMode,
    name: "Light",
    icon: Sun,
  },
  {
    id: "dark" as ThemeMode,
    name: "Dark",
    icon: Moon,
  },
];
interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const ThemeSelectorBottomSheet = ({ isOpen = false, onClose }: Props) => {
  const { colors, setTheme, theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>(theme);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const handleSelectTheme = (newTheme: ThemeMode) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
  };

  React.useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isOpen]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={[
        styles.sheetBackground,
        { backgroundColor: colors.background.primary },
      ]}
      handleIndicatorStyle={[
        styles.indicator,
        { backgroundColor: colors.text.secondary },
      ]}
      style={styles.bottomSheet}
      handleStyle={styles.handleStyle}
      onDismiss={onClose}
    >
      <BottomSheetView
        style={[
          styles.sheetContent,
          { backgroundColor: colors.background.primary },
        ]}
      >
        <CText style={[styles.sheetTitle, { color: colors.text.primary }]}>
          Select your preferred theme
        </CText>
        <CText style={[styles.description, { color: colors.text.secondary }]}>
          Start customize your app theme according to your preference.
        </CText>

        <View style={styles.themesContainer}>
          {themes.map((theme) => (
            <View
              key={theme.id}
              style={[
                styles.themeItem,
                { backgroundColor: colors.background.muted },
                selectedTheme === theme.id && [
                  styles.selectedThemeItem,
                  { borderColor: colors.primary.main },
                ],
              ]}
            >
              <TouchableOpacity
                style={styles.themeContent}
                onPress={() => handleSelectTheme(theme.id)}
              >
                <View style={styles.themeInfo}>
                  <theme.icon color={colors.text.primary} />
                  <CText
                    style={[styles.themeName, { color: colors.text.primary }]}
                  >
                    {theme.name}
                  </CText>
                </View>
                {selectedTheme === theme.id && (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: colors.primary.main,
                      borderRadius: 25,
                    }}
                  >
                    <Check size={15} color={colors.text.white} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    marginHorizontal: 0,
  },
  sheetBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  indicator: {
    width: 40,
    height: 4,
  },
  handleStyle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  sheetContent: {
    flex: 1,
    padding: 16,
  },

  sheetTitle: {
    fontSize: 18,
    fontFamily: "StackSans-Bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 28,
  },
  themesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginTop: 24,
  },
  themeItem: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedThemeItem: {
    // Border color moved to inline style
  },
  themeContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  themeInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  flag: {
    width: 24,
    height: 24,
  },
  themeName: {
    fontSize: 14,
  },
  continueButton: {
    marginTop: 24,
  },
});

export default ThemeSelectorBottomSheet;
