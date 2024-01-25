import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { useRoute } from '@react-navigation/native'

const TransactionWebView = () => {
  const {params}=useRoute();
  return (
    <WebView startInLoadingState source={{ uri:params.uri}} style={{ flex: 1,marginTop:30 }} />
  )
}

export default TransactionWebView

const styles = StyleSheet.create({})