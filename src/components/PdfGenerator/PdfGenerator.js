import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  table: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    border: "1 solid black",
  },
  titles: {
    backgroundColor: "purple",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  descriptions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    padding: 10,
    marginTop: 50,
  },
  description: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottom: "1 solid black",
    borderTop: "1 solid black",
  },
  type: {
    width: "25%",
  },
  Descr: {
    width: "100%",
    marginBottom: 20,
    fontWeight: 600,
  },
});

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});
const PdfGenerator = (props) => {
  return (
    <Document language="en">
      <Page style={styles.body}>
        <Text style={styles.header}>From: {props.beginAdress}</Text>
        <Text style={styles.header}>To: {props.destinationAdress}</Text>
        {props.instructions ? (
          <View style={styles.table}>
            <View style={styles.titles}>
              <Text style={styles.type}>Type</Text>
              <Text style={styles.type}>Distance</Text>
              <Text style={styles.type}>Road</Text>
              <Text style={styles.type}>Direction</Text>
            </View>
            {props.instructions.map((element, index) => {
              return (
                <View key={index} style={styles.description}>
                  <Text style={styles.type}>{element.type}</Text>
                  <Text style={styles.type}>
                    {element.distance.toFixed(0) > 1000
                      ? (element.distance.toFixed(0) / 1000).toFixed(0) + "km"
                      : element.distance.toFixed(0) + "m"}
                  </Text>
                  <Text style={styles.type}>{element.road}</Text>
                  <Text style={styles.type}>{element.direction}</Text>
                </View>
              );
            })}
          </View>
        ) : null}
        <View style={styles.descriptions}>
          <Text style={styles.Descr}>Costs: {props.costs} $</Text>
          <Text style={styles.Descr}>
            Distance: {(props.distance / 1000).toFixed(0)} km
          </Text>
          <Text style={styles.Descr}>
            Time: {props.hours} hours {props.minutes} minutes
          </Text>
          <Text style={styles.Descr}>Days: {props.days}</Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
};
export default PdfGenerator;
