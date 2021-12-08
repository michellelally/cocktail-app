import { StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
      backgroundColor: "#ff5400",
      flex: 1,
      paddingHorizontal: 20
    },
    text: {
      color: "#fff",
      fontSize: 25,
      textAlign: "center",
      letterSpacing: -0.02,
      fontWeight: "600",
      fontFamily: 'Poppins-ExtraLight.ttf '
    },
    image: {
        flex: 1,
        justifyContent: "center",
      },
    safearea: {
      flex: 1,
      marginTop: 100,
      justifyContent: "space-between"
    },
    inputBox: {
        height: 50,
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 20
    },
    itemText: {
        fontSize: 25,
        paddingTop: 5,
        textAlign: "center"
    },
    textInput: {
        fontSize: 15,
        height: 50,
        margin: 10,
        paddingLeft: 20,
        backgroundColor: '#FFF',
        borderRadius: 6,
    }
  });