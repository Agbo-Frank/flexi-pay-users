import { Button, Checkbox, Grid, MenuItem, Pagination, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { 
    Body, Categories, 
    DropDown, Header, 
    ProductCard, Empty,
    ProductCardSkeleton, 
    Breadcrumb,
    SearchBar,
    Footer} from "../../components"
import Banner from "../../components/Banner"
import TextHeader from "../../components/TextHeader"
import banner from '../../asset/term.png'


export function TermsAndCondition(){
    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <div className="w-full h-fit bg-white sm:bg-grey-500">
                <Header />
                <Categories />
                <Breadcrumb />
                <div className="block sm:hidden w-11/12 my-2 mx-auto bg-white">
                    <SearchBar />
                </div>
                <div className="w-full px-5 md:px-16 pb-10">
                  <Banner title={banner} />
                  <div className="py-16">

                    <div className="w-full pb-16">
                      <TextHeader title="INTRODUCTION" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            This website can be accessed at www.FlexiPay.ng, related mobile-sites and software applications (the “Website”) and is owned and operated by Viral Tribe Limited (“FlexiPay”, “we”, “us” and “our”).
                          </li>
                          <li>
                            These Website Terms and Conditions (“Terms and Conditions”) govern the ordering, sale and delivery of Goods, and the use of the Website.
                          </li>
                          <li>
                            These Terms and Conditions are binding and enforceable against every person that accesses or uses this Website (“you”, “your” or “user”), including without limitation each user who registers as contemplated below (“registered user”). By using the Website and by clicking on the “Register” button on the Website, as may be applicable, you acknowledge that you have read and agree to be bound by these Terms and Conditions.
                          </li>
                          <li>
                            The Website enables you to shop online for an extensive range of goods including sport, home and kitchenware, baby and toddler products, electronics, health and beauty products, movies and TV, gaming, books, music, toys, pet supplies, and more (“Goods”).
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full pb-16">
                      <TextHeader title="IMPORTANCE nOTIcE" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            These Terms and Conditions contain provisions that appear in similar text and style to this clause and which -
                            <ol type="i" className="list-decimal md:px-6">
                              <li>may limit the risk or liability of FlexiPay or a third party; and/or </li>
                              <li>may create risk or liability for the user; and/or </li>
                              <li>may compel the user to indemnify FlexiPay or a third party;</li>
                              <li>and/or serves as an acknowledgement, by the user, of a fact.</li>
                            </ol>
                          </li>
                          <li>
                            Your attention is drawn to these Terms and Conditions because they are important and should be carefully noted.
                          </li>
                          <li>
                            If there is any provision in these Terms and Conditions that you do not understand, it is your responsibility to ask FlexiPay to explain it to you before you accept the Terms and Conditions or continue using the Website.
                          </li>
                          <li>
                            The use of this Website is subject to the Terms and Conditions. By using this Website in any way, you shall be deemed to have accepted all the Terms and Conditions unconditionally. You must not use this Website if you do not agree to the Terms and Conditions.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full pb-16">
                      <TextHeader title="RETURNS" />
                      <div className="text-[#000541] my-3">
                        <p>
                          Please refer to our Returns Policy for more information about returning products (and related refunds, replacements or repairs).  The Returns Policy is incorporated by reference (which means that it forms part of these Terms and Conditions).
                        </p>
                      </div>
                    </div>

                    <div className="w-full pb-16">
                      <TextHeader title="REGISTRATION AND USE OF WEBSITE" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            Only registered users may order Goods on the Website.
                          </li>
                          <li>
                            To register as a user, you must provide email and password and, and personal details to FlexiPay. You will need to use your unique email and password to access the Website in order to purchase Goods.
                          </li>
                          <li>
                            You agree and warrant that your username and password shall: 
                            <ol type="i" className="list-decimal md:px-6">
                              <li>be used for personal use only; and </li>
                              <li>not be disclosed by you to any third party. </li>
                            </ol>
                          </li>
                          <li>
                            For security purposes you agree to enter the correct email and password whenever ordering Goods, failing which you will be denied access.
                          </li>
                          <li>
                            You agree that, once the correct email and password relating to your account have been entered, irrespective of whether the use of the email and password is uauthorised or fraudulent, you will be liable for payment of such order, save where the order is cancelled by you in accordance with these Terms and Conditions.
                          </li>
                          <li>
                            You agree to notify FlexiPay immediately upon becoming aware of or reasonably suspecting any unauthorised access to or use of your username and password and to take steps to mitigate any resultant loss or harm.
                          </li>
                          <li>
                            By using the Website you warrant that you are 18 (eighteen) years of age or older and of full legal capacity. If you are under the age of 18 (eighteen) or if you are not legally permitted to enter into a binding agreement, then you may use the Website only with the involvement and supervision of your parent or legal guardian. If your parent or legal guardian supervises you and gives his/her consent, then such person agrees to be bound to these Terms and Conditions and to be liable and responsible for you and all your obligations under these Terms and Conditions.
                          </li>
                          <li>
                            By using the Website you warrant that you are 18 (eighteen) years of age or older and of full legal capacity. If you are under the age of 18 (eighteen) or if you are not legally permitted to enter into a binding agreement, then you may use the Website only with the involvement and supervision of your parent or legal guardian. If your parent or legal guardian supervises you and gives his/her consent, then such person agrees to be bound to these Terms and Conditions and to be liable and responsible for you and all your obligations under these Terms and Conditions.
                          </li>
                          <li>
                            You agree that you will not in any way use any device, software or other instrument to interfere or attempt to interfere with the proper working of the Website. In addition, you agree that you will not in any way use any robot, spider, other automatic device, or manual process to monitor, copy, distribute or modify the Website or the information contained herein, without the prior written consent from an authorised FlexiPay representative (such consent is deemed given for standard search engine technology employed by Internet search websites to direct Internet users to this Website).
                          </li>
                          <li>
                            You may not use the Website to distribute material which is defamatory, offensive, contains or amounts to hate speech or is otherwise unlawful.
                          </li>
                          <li>
                            You may not in any way display, publish, copy, print, post or otherwise use the Website and/or the information contained therein without the express prior written consent of an authorised FlexiPay representative.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Conclusion of sales and availability of stock" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            Registered users may place orders for Goods, which FlexiPay or the Third Party Seller may accept or reject. Whether or not FlexiPay or the Third Party Seller accepts an order depends on the availability of Goods, correctness of the information relating to the Goods (including without limitation the price) and receipt of payment or payment authorisation by FlexiPay for the Goods.
                          </li>
                          <li>
                            NOTE: FlexiPay or the Third Party Seller will indicate the acceptance of your order by delivering the Goods to you or allowing you to collect them, and only at that point will an agreement of sale between you and FlexiPay or the Third Party Seller come into effect (the “Sale”). This is regardless of any communication from FlexiPay stating that your order or payment has been confirmed. FlexiPay will indicate the rejection of your order (by FlexiPay itself) by cancelling it and, as soon as possible thereafter, refunding you for any amount already paid.
                          </li>
                          <li>
                            Prior to delivery or your collection of the Goods, you may cancel an order at any time provided you do so before receiving a dispatch or delivery notice. After delivery or your collection of the Goods, you may return the Goods only in accordance with the Returns Policy.
                          </li>
                          <li>
                            Placing Goods in a wishlist or shopping basket without completing the purchase cycle does not constitute an order for such Goods, and as such, Goods may be removed from the shopping basket if stock is no longer available or the price thereof might change without notice to you. You cannot hold FlexiPay or the Third Party Seller liable if such Goods are not available or are not available at the particular price when you complete or attempt to complete the purchase cycle at a later stage.
                          </li>
                          <li>
                            You acknowledge that stock of all Goods on offer is limited and that pricing may change at any time without notice to you. In the case of Goods for sale by FlexiPay, FlexiPay will take all reasonable efforts to monitor stock levels and ensure that when stock is no longer available, that offers thereof are discontinued on the Website. However, we cannot guarantee the availability of stock. When Goods are no longer available after you have placed an order, FlexiPay will notify you and you will be entitled to a refund of any amount already paid by you for such Goods. 
                          </li>
                          <li>
                            In the case of Goods for sale by a Third Party Seller, FlexiPay relies on inventory information supplied by the relevant Third Party Seller and FlexiPay accordingly bears no liability for any inaccuracies in the information supplied to it. Consequently, should you order any Goods from a Third Party Seller which are in fact sold-out, any resulting dispute should be resolved between you and the relevant Third Party Seller, your respective rights and obligations being as set out in these Terms and Conditions.
                          </li>
                          <li>
                            Certain Goods may not be purchased for re-sale. Should we suspect that any such Goods are being purchased for sale, we are entitled to cancel your order immediately on notice to you.
                          </li>
                          <li>
                            Please see details relating to Pre-orders in our FAQ’s: Pre-Order, which are incorporated by reference.
                          </li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
                <Footer />
            </div>
        </Body>
    )
}

export default TermsAndCondition