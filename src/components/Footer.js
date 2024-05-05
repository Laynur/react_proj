import React from 'react'
import { Text } from '@consta/uikit/Text';
function Footer(){
    return (
        <div className="footer">
            <div className="footer-info">
                <Text view="normal" size="2xl">Разработал: Латыпов А.Д.</Text>
                <Text view="normal" size="2xl" >ТГ: <a style={{color:'#33b4ff'}} href="https://t.me/laykey02">@laykey02</a></Text>
            </div>
        </div>
    );
}
export default Footer;