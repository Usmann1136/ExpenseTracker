import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

export default function SplashScreen (){
    return(<View style={style.view}>
         <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
         <View style={style.centerview}>
            <Image source={require('../assets/images/iconsexpense25.png')}/>
            <Text style={style.centertext}>
                Expense Tracker
            </Text>
         </View>
    </View>);
}

const style = StyleSheet.create({
view:{
flex:1,
backgroundColor:'white',
justifyContent:'center',
alignItems:'center',

},
centerview:{

alignItems:'center'
},
centertext:{
fontSize:24,

fontWeight:'400'

}

})