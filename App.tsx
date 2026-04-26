import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGame } from "./src/hooks";

export default function App() {
  const game = useGame();

  const isLoading = game.status === "loading";
  const isAnswered = game.status === "answered";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.scoreText}>
          PONTOS: {game.score}
        </Text>
      </View>

      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>QUE CÃO É ESSE?</Text>
              <Text style={styles.phraseText}>{game.phrase}</Text>
            </View>

            <View style={styles.centralArea}>
              <View style={styles.imageCircle}>
                <Image
                  source={{ uri: game.dogImage }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            </View>
          </>
        )}
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.optionsGrid}>
          {!isLoading && game.options.map((option) => {
            const isSelected = game.selectedOptionId === option.id;
            let buttonStyles: any[] = [styles.optionButton];

            if (isAnswered) {
              if (option.isCorrect) {
                buttonStyles.push(styles.correctButton);
              } else if (isSelected) {
                buttonStyles.push(styles.incorrectButton);
              }
            }

            return (
              <TouchableOpacity
                key={option.id}
                style={buttonStyles}
                onPress={() => game.handleOptionPress(option)}
                disabled={isAnswered}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{option.label.toUpperCase()}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footerAction}>
          {isAnswered && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={game.nextRound}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>PRÓXIMO CACHORRO</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

// AI: helped a lot to define the UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    paddingTop: 10,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 11,
    letterSpacing: 3,
    color: "#999",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
    width: "100%",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  phraseText: {
    fontFamily: "serif",
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 8,
    fontStyle: "italic",
    lineHeight: 22,
  },
  centralArea: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  imageCircle: {
    width: "85%",
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: "#EEE",
    overflow: "hidden",
    borderWidth: 8,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bottomPanel: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    minHeight: 120, // Garante espaço mesmo carregando
  },
  optionButton: {
    width: "48%",
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  optionText: {
    fontSize: 12,
    letterSpacing: 0.5,
    color: "#1A1A1A",
    fontWeight: "500",
  },
  correctButton: {
    backgroundColor: "#E8F5E9",
    borderColor: "#A5D6A7",
  },
  incorrectButton: {
    backgroundColor: "#FFEBEE",
    borderColor: "#EF9A9A",
  },
  footerAction: {
    height: 80,
    justifyContent: "center",
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: "#1A1A1A",
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 14,
    letterSpacing: 1.5,
    fontWeight: "700",
  },
});
