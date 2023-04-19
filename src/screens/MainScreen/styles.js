import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  banner: {
    backgroundColor: "rgba(95, 158, 160, 0.9)",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    color: "#fff",
    fontSize: 18,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  userProfileButton: {
    color: "#fff",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  signOutButton: {
    color: "#fff",
    fontSize: 18,
    textDecorationLine: "underline",
    marginLeft: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#ddd",
  },
  tab: {
    padding: 10,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedTab: {
    backgroundColor: "#ccc",
  },

  tabText: {
    fontSize: 18,
  },
  favoritesContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  favoriteItem: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: "column",
  },
  favoriteName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  favoriteAddress: {
    fontSize: 14,
    color: "#777",
  },
  noFavoritesText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});

export default styles;
