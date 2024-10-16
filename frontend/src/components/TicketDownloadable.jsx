import React, { useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import logo from '../images/logoo.avif'; // Correct path to the logo

const TicketDocument = ({ ticketData }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    logo: {
      width: 50,
      height: 50,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    detailsSection: {
      marginBottom: 15,
    },
    detailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    label: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    value: {
      fontSize: 12,
    },
    footer: {
      textAlign: 'center',
      fontSize: 10,
      marginTop: 30,
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text>Jet Set Go</Text>
          <Text>{ticketData.flightNumber}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Flight Ticket</Text>

        {/* Flight Details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Airline:</Text>
            <Text style={styles.value}>{ticketData.airline}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Route:</Text>
            <Text style={styles.value}>{ticketData.route}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Departure:</Text>
            <Text style={styles.value}>{ticketData.departure}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Arrival:</Text>
            <Text style={styles.value}>{ticketData.arrival}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Source:</Text>
            <Text style={styles.value}>{ticketData.source}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.value}>{ticketData.destination}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{ticketData.price}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Visit our website: www.jetsetgo.com</Text>
      </Page>
    </Document>
  );
};

export default function FlightTicket() {
  const [ticketData] = useState({
    flightNumber: '327489',
    airline: 'JetAirways',
    route: 'Delhi -> Nagpur',
    departure: '09:20:00',
    arrival: '12:34:00',
    source: 'Delhi',
    destination: 'Nagpur',
    price: '₹3400',
  });

  return (
    <div className="flex flex-col items-center p-10 bg-gradient-to-r from-blue-500 to-teal-400 text-white">
      {/* Ticket Display */}
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <img src={logo} alt="Jet Set Go" className="w-12 h-12" />
          <h2 className="text-2xl font-bold">Flight Ticket</h2>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Flight Number:</span>
            <span>{ticketData.flightNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Airline:</span>
            <span>{ticketData.airline}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Route:</span>
            <span>{ticketData.route}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Departure:</span>
            <span>{ticketData.departure}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Arrival:</span>
            <span>{ticketData.arrival}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Source:</span>
            <span>{ticketData.source}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Destination:</span>
            <span>{ticketData.destination}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Price:</span>
            <span>{ticketData.price}</span>
          </div>
        </div>
      </div>

      {/* PDF Download Link */}
      <div className="mt-8">
        <PDFDownloadLink
          document={<TicketDocument ticketData={ticketData} />}
          fileName="flight_ticket.pdf"
        >
          {({ loading }) =>
            loading ? (
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg">Generating PDF...</button>
            ) : (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Download Ticket as PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}
