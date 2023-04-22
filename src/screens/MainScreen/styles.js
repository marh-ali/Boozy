import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  banner: {
    backgroundColor: "#5F9EA0",
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "70%",
  },

  restaurantInfo: {
    marginBottom: 10,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  restaurantDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  favoriteButtonContainer: {
    alignItems: "flex-end",
    marginTop: -5,
  },
});

export default styles;
