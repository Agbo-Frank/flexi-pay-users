import { 
    Body, Categories, 
    Header, 
    Breadcrumb,
    SearchBar,
    Footer} from "../../components"
import Banner from "../../components/Banner"
import TextHeader from "./TextHeader"
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

                    <div className="w-full">
                      <TextHeader title="Payment" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            We are committed to providing secure online payment facilities. All transactions are encrypted using appropriate encryption technology.
                          </li>
                          <li>
                            Whether the Goods are for sale by FlexiPay or a Third Party Seller, payment may be made for Goods via the following methods (depending on its availability and/or your eligibility to use such a method) -

                            <ul className="list-disc px-4">
                              <li>
                                Debit card; where payment is made by debit card, we may require additional information in order to authorise and/or verify the validity of payment. In such cases we are entitled to withhold delivery until such time as the additional information is received by us and authorisation is obtained by us for the amounts. If we do not receive authorisation your order for the Goods will be cancelled. You warrant that you are fully authorised to use the debit card supplied for purposes of paying for the Goods. You also warrant that your debit card has sufficient available funds to cover all the costs incurred as a result of the services used on the Website;
                              </li>

                              <li>
                                Direct bank deposit or electronic funds transfer: if you pay via direct bank deposit or electronic funds transfer, payment must be made within 5 (five) days of placing your order. FlexiPay will not accept your order if payment has not been received;
                              </li>

                              <li>Instant EFT;</li>
                              
                              <li>Cash on delivery (except where any of our exclusions apply, as listed in our FAQ); by selecting this option, you undertake to ensure that you have the exact cash on hand at the time of delivery.</li>

                              <li>eBucks;</li>

                              <li>Discovery Miles;</li>
                              
                              <li>MasterPass;</li>

                              <li>FlexiPay Vouchers;</li>
                            </ul>
                          </li>

                          <li>
                            Once you have selected your payment method (save for cash on delivery or direct bank deposit), you will be directed to a link to a secure site for payment of the applicable purchase price for the Goods.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Delivery of goods" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            FlexiPay offers 2 (two) methods of delivery of Goods to you. You may elect delivery via:
                            <ul className="list-disc px-4">
                              <li>courier; or</li>

                              <li>self-collection.</li>
                            </ul>
                          </li>
                          <li>
                            For more information about delivery, please see our FAQs: Shipping and Delivery, which are incorporated into these Terms by reference. Our delivery charges are subject to change at any time, without prior notice to you, so please check the FAQs for the most up-to-date information. You will see the applicable delivery charges in your cart when you check out.
                          </li>
                          <li>
                            Where it accepts your order, FlexiPay or the Third Party Seller will deliver the Goods to you as soon as reasonably possible, but no later than 30 (thirty) days of receipt of your payment (“Delivery Period”). We will notify you if we are unable to deliver the Goods during the Delivery Period. You may then, within 7 (seven) days of receiving such notification elect whether or not to cancel your order for the Goods. If you elect to cancel your order, we will reimburse you for the purchase price.
                          </li>
                          <li>
                          FlexiPay’s obligation to deliver a product to you is fulfilled when we deliver the product to the physical address nominated by you for delivery of the order. <strong>FlexiPay is not responsible for any loss or unauthorised use of a product, after it has delivered the product to the physical address nominated by you.</strong>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Errors" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                             <strong>We shall take all reasonable efforts to accurately reflect the description, availability, purchase price and delivery charges of Goods on the Website. However, should there be any errors of whatsoever nature on the Website (which are not due to our gross negligence), we shall not be liable for any loss, claim or expense relating to a transaction based on any error, save – in the case of any incorrect purchase price – to the extent of refunding you for any amount already paid, or otherwise as set out in the Returns Policy. </strong>
                          </li>
                          <li>
                          FlexiPay shall not be bound by any incorrect information regarding our Goods displayed on any third party websites.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Gift Vouchers & Coupons" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            FlexiPay may from time to time make physical or electronic gift vouchers (“Gift Vouchers”) and promotional coupons or discounts (“Coupons”) available for use on the Website towards the purchase of FlexiPay Goods. Gift Vouchers and Coupons can only be redeemed while they are valid and their expiry dates cannot be extended. More specifically:
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <h1 className='capitalize text-sm md:text-2xl text-[#000541] font-medium '>Gift Vouchers</h1>
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            Gift Vouchers that are purchased by registered users are valid for 3 years after Sale. Gift Vouchers that FlexiPay gives away for free are valid for the period stated thereon. In each case, if your Voucher has not been used within that period, it will expire.
                          </li>
                          <li>
                            Gift Vouchers cannot be used to buy other Gift Vouchers or Coupons. They do not accrue interest and are not refundable for cash once purchased or otherwise obtained. If your Gift Voucher value is less than the amount required to cover the full order you wish to place, you may make up the difference by paying via one of our other payment methods.
                          </li>
                          <li>
                            <strong>FlexiPay is not responsible for any harm due to the loss, unauthorised use or unauthorised distribution of a Gift Voucher, after it has delivered the Gift Voucher to you or the email address nominated by you.</strong>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <h1 className='capitalize text-sm md:text-2xl text-[#000541] font-medium '>Coupons</h1>
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            There are two types of Coupons; a Coupon with a fixed amount of a discount, e.g. ₦1000 off (<strong>“Fixed Coupon“</strong>), and a Coupon with a percentage discount, e.g. 10% off (<strong>“Percentage Coupon“</strong>).
                          </li>
                          <li>
                            Coupons are issued in FlexiPay’s sole discretion and we are entitled at any time to correct, cancel or reject a Coupon for any reason (including without limitation where a Coupon has been distributed in an unauthorised manner). Users do not have a right to Coupons, and Coupons cannot be earned. Coupons are issued under specific terms and conditions regulating when and how they may be used.
                          </li>
                          <li>
                            As a general rule, and unless specified otherwise on the specific Coupon itself:
                            <ul className="list-disc px-4">
                              <li>
                                each Coupon can only be used once;
                              </li>
                              <li>
                                only one Coupon can be used per order;
                              </li>
                              <li>
                                only one Coupon can be used on the Website per person per promotion/campaign;
                              </li>
                              <li>Percentage Coupons may only be redeemed on purchases with a total cart value of less than ₦50,000;</li>
                              <li>
                                where a Percentage Coupon has been used and you wish to cancel any items in the order prior to making payment, the entire order must be cancelled. You will be issued with a new Percentage Coupon and will need to place the order again, without the item that you wished to cancel;
                              </li>
                              <li>a Coupon must be used at check-out – it cannot be used later on existing orders; and</li>
                              <li>the value of the Coupon will be set off against the value of your shopping basket and the balance remaining, if any, will be payable by you.</li>
                            </ul>
                          </li>
                          <li>Coupons cannot be used to buy Gift Vouchers or other Coupons, and cannot be exchanged or refunded for cash or credit. <strong>FlexiPay is not responsible for any harm due to the loss, unauthorised use or distribution of a Coupon.</strong></li>
                          <li>If for any reason a Coupon does not reflect on the final amount due to you at check-out, you can contact us here (FlexiPay.ng/help) to confirm if the Coupon is still valid.  If FlexiPay confirms that the Coupon is still valid and you have already placed your order, you can choose whether to cancel the order and place it again with the Coupon, or you can use the Coupon on 
                              your next order within the limitations of the specific Coupon’s terms and conditions.
                          </li>
                          <li>You may be required to submit the original communication containing the Coupon code, and any other information reasonably requested by FlexiPay, before you are able to use a Coupon. </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Daily Deals and other discounted Goods" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            From time to time, we may offer certain Goods at discounted prices as part of a Daily Deal, App Only Deal, Bundle Deal or any other temporary deal which are explained below (each a <strong>“Deal”</strong>). These will be subject to certain conditions (as set out in these Terms and/or the Website), which define the scope of the Deal. If you buy a product <i>within the scope of a Deal</i>, you will pay the discounted price for that product (the <strong>“Deal Price”</strong>).
                          </li>
                          <li>However, if you buy a product in a manner that falls <i> outside of the scope of a Deal,</i> then you will pay the then current (non-Deal) selling price on the Website (the “Normal Price”), for each product that falls outside the scope of the Deal.</li>
                          <li>For example: if you buy more than one product in a Daily Deal, you will pay the Deal Price for the first product, but the Normal Price for all products thereafter. Alternatively, if you buy a product in combination with any other products that together do not constitute a Bundle Deal, you will pay the Normal Price for all such products falling outside the scope of the relevant Deal.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <h1 className='capitalize text-sm md:text-2xl text-[#000541] font-medium '>Daily Deals</h1>
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            At our discretion, Daily Deals (“Deals”) are available daily from 7am – 23:59pm on week days and from 9am – 23:59pm on weekends. In addition, please note that Daily Deals have a stock limit and may expire earlier if stock runs out.
                          </li>
                          <li>
                            Daily Deals quantities are limited and as such, after a Daily Deal is sold out, those particular Goods may be available on the Website at their normal selling prices (but no longer as a Daily Deal).
                          </li>
                          <li>
                            We do not guarantee a specific saving. The extent of the Daily Deal or discount is at the sole discretion of FlexiPay.
                          </li>
                          <li>Four of each Daily Deal may be purchased per customer, limited to your first order daily.</li>
                          <li>Adding a Daily Deal to your cart, or completing your order for a Daily Deal without paying for it, does not reserve the item for you. </li>
                          <li>FlexiPay will reserve stock for customers in the order in which it receives payment. Therefore if you are slow to make payment, you might not get your item because the Daily Deal might sell out to customers paying immediately.</li>
                          <li>The List Price shown in respect of Daily Deals and other discounted Goods is the recommended retail price suggested to us by the supplier of the relevant product. Where the supplier has not provided a recommended retail price, an estimate may be provided. Where a product is offered for sale by a Third Party Seller, the List Price may be provided by the Third Party Seller.</li>
                          <li>
                            <strong>By purchasing any Daily Deal, you are also automatically opting in for our Daily Deals daily newsletter as well as our general newsletter (you may opt-out of these newsletters at any time). Opting out of these newsletters after purchase will not affect the value of the Goods purchased.</strong>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <h1 className='capitalize text-sm md:text-2xl text-[#000541] font-medium '>App Only Deals</h1>
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            We also have Daily Deals (called <strong>“App Only Deals“</strong>) which will only be available for purchase using the FlexiPay software application (“App”), although they may also be displayed on the FlexiPay website and mobi-site. The App can be downloaded on IOS and Android devices. In addition to the above Daily Deal Terms and Conditions, the following terms apply to App Only Deals:
                          </li>
                          <ul className="list-disc px-4">
                            <li>
                              App Only Deals are only available for purchase using the App and their prices may differ from the normal selling prices at which those particular Goods may be available on the website or mobi-site.
                            </li>
                            <li>You will only receive the App Only Deal price if you pay for your order using the App before the App Only Deal has expired or sold out. You will not receive the App Only Deal price if you pay for your order using the website or mobi-site, or if you don’t pay for your order before the App Only Deal has expired or sold out.</li>
                          </ul>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <h1 className='capitalize text-sm md:text-2xl text-[#000541] font-medium '>Bundle Deals</h1>
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            We may from time to time offer bundle deals for sale under the Bundle Deals tab on the Website (“Bundle Deals“). Each Bundle Deal will consist of two or more products that either we or you (as provided on the Website) have combined together in a single bundle.
                          </li>
                          <li>
                            Any saving or discount resulting from purchasing a Bundle Deal instead of its component products separately may be applied to any of the component products individually in our sole discretion. The actual purchase price (after applying any applicable saving or discount) of each component product will be communicated to you upon checkout and reflected in your order history. This is relevant to the amount that would be refunded to you, if you were to return any product in a Bundle Deal for a refund, in accordance with our Returns Policy.
                          </li>
                          <li>
                            A Bundle Deal should be distinguished from a pre-packed bundle compiled by our supplier and supplied to us as a single unit (“Pre-packed Bundles“). Any saving or discount in respect of a Pre-packed Bundle will be applied only to the total bundle price and not to the prices of the individual component products. Please refer to our Returns Policy for information about returning a Pre-packed Bundle.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Third Party Sellers" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            FlexiPay will indicate on product pages when Goods are for sale by a Third Party Seller. In such cases FlexiPay only provides the platform to facilitate transactions between Third Party Sellers and FlexiPay customers. FlexiPay is neither the buyer nor the seller of these Goods unless otherwise specified.</li>
                          <li>
                            The Sale formed on acceptance of your order (in accordance with clause 5.2) for Goods that are for sale by a Third Party Seller is therefore solely between the registered user and such Third Party Seller. FlexiPay is not a party to that sale.
                          </li>
                          <li>
                            The Third Party Seller is solely responsible for fulfilment of delivery of the Goods.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Privacy policy" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            We respect your privacy and will take all reasonable measures to protect it, as more fully detailed in our Privacy Policy (FlexiPay.ng/privacy-policy), which is incorporated by reference.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Changes to these Terms and Conditions" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            FlexiPay may, in its sole discretion, change any of these Terms and Conditions at any time. It is your responsibility to regularly check these Terms and Conditions and make sure that you are satisfied with the changes. Should you not be satisfied, you must not place any further orders on, or in any other way use, the Website.
                          </li>
                          <li>
                            Any such change will only apply to your use of this Website after the change is displayed on the Website. If you use the Website after such amended Terms and Conditions have been displayed on the Website, you will be deemed to have accepted such changes.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Electronic communications" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            When you visit the Website or send emails to us, you consent to receiving communications from us or any of our divisions, affiliates, or partners electronically in accordance with our privacy policy as set out in clause 15 above.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Ownership and copyright" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            The contents of the Website, including any material, information, data, software, icons, text, graphics, lay-outs, images, sound clips, advertisements, video clips, trade names, logos, trade-marks, designs and service marks which are displayed on or incorporated in this Website (“Website Content”) are protected by law, including but not limited to copyright and trade mark law. The Website Content is the property of FlexiPay, its advertisers and/or sponsors and/or is licensed to FlexiPay.
                          </li>
                          <li>	You will not acquire any right, title or interest in or to the Website or the Website Content.</li>
                          <li>Any use, distribution or reproduction of the Website Content is prohibited unless expressly authorised in terms of these Terms and Conditions or otherwise provided for in law. To obtain permissions for the commercial use of any Website Content contact us via our Help page.</li>
                          <li>Where any of the Website Content has been licensed to FlexiPay or belongs to any third party, your rights of use will also be subject to any terms and conditions which that licensor or third party imposes from time to time and you agree to comply with such third party terms and conditions.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Disclaimer" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            <strong>The use of the Website is entirely at your own risk and you assume full responsibility for any risk or loss resulting from use of the Website or reliance on any information on the Website.</strong>
                          </li>
                          <li>Whilst FlexiPay takes reasonable measures to ensure that the content of the Website is accurate and complete, FlexiPay makes no representations or warranties, whether express or implied, as to the quality, timeliness, operation, integrity, availability or functionality of the Website or as to the accuracy, completeness or reliability of any information on the Website. If any such representations or warranties are made by FlexiPay’s representatives, FlexiPay shall not be bound thereby.</li>
                          <li>
                            <strong>FlexiPay disclaims liability for any damage, loss or expenses, whether direct, indirect or consequential in nature, arising out of or in connection with your access to or use of the Website and/or any content therein unless otherwise provided by law.</strong>
                          </li>
                          <li>
                            <strong>Although Goods sold from the Website may, under certain specifically defined circumstances, be under warranty, the Website itself and all information provided on the Website is provided “as is” without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, completeness, or non-infringement, as may be allowed in law.</strong>
                          </li>
                          <li>Any views or statements made or expressed on the Website are not necessarily the views of FlexiPay, its directors, employees and/or agents.</li>
                          <li>
                            <strong>
                              In addition to the disclaimers contained elsewhere in these Terms and Conditions, FlexiPay also makes no warranty or representation, whether express or implied, that the information or files available on the Website are free of viruses, spyware, malware, trojans, destructive materials or any other data or code which is able to corrupt, destroy, compromise, disrupt, disable, harm, jeopardize or otherwise impede in any manner the operation, stability, security functionality or content of your computer system, computer network, hardware or software in any way. You accept all risk associated with the existence of such viruses, destructive materials or any other data or code which is able to corrupt, compromise, jeopardize, disrupt, disable, harm or otherwise impede in any manner the operation or content of a computer system, computer network, any handset or mobile device, or your hardware or software, save where such risks arise due to the gross negligence or willful misconduct of FlexiPay, its employees, agents or authorized representatives. FlexiPay thus disclaims all liability for any damage, loss or liability of any nature whatsoever arising out of or in in connection with your access to or use of the Website.
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Linking to third party websites" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>This Website may contain links or references to other websites (“Third Party Websites”) which are outside of our control, including those of advertisers. These Terms and Conditions do not apply to those Third Party Websites and FlexiPay is not responsible for the practices and/or privacy policies of those Third Party Websites or the “cookies” that those sites may use.</li>
                          <li>
                            <strong>Notwithstanding the fact that the Website may refer to or provide links to Third Party Websites, your use of such Third Party Websites is entirely at your own risk and we are not responsible for any loss, expense, claim or damage, whether direct, indirect or consequential, arising from your use of such Third Party Websites or your reliance on any information contained thereon.</strong>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Limitation of liability" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            FlexiPay cannot be held liable for any inaccurate information published on the Website and/or any incorrect prices displayed on the Website, save where such liability arises from the gross negligence or willful misconduct of FlexiPay, its employees, agents or authorized representatives. You are encouraged to contact us to report any possible malfunctions or errors by way of our Help page.
                          </li>
                          <li>
                            <strong>FLEXIPAY SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL LOSS OR DAMAGES WHICH MIGHT ARISE FROM YOUR USE OF, OR RELIANCE UPON, THE WEBSITE OR THE CONTENT CONTAINED IN THE WEBSITE; OR YOUR INABILITY TO USE THE WEBSITE, AND/OR UNLAWFUL ACTIVITY ON THE WEBSITE AND/OR ANY LINKED THIRD PARTY WEBSITE.</strong>
                          </li>
                          <li>
                            <strong>YOU HEREBY INDEMNIFY FLEXIPAY AGAINST ANY LOSS, CLAIM OR DAMAGE WHICH MAY BE SUFFERED BY YOURSELF OR ANY THIRD PARTY ARISING IN ANY WAY FROM YOUR USE OF THIS WEBSITE AND/OR ANY LINKED THIRD PARTY WEBSITE.</strong>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Availability and termination" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            We will use reasonable endeavors to maintain the availability of the Website, except during scheduled maintenance periods, and are entitled to discontinue providing the Website or any part thereof with or without notice to you.
                          </li>
                          <li>
                            FlexiPay may in its sole discretion terminate, suspend and modify this Website, with or without notice to you. You agree that FlexiPay will not be liable to you in the event that it chooses to suspend, modify or terminate this Website other than for processing any orders made by you prior to such time, to the extent possible.
                          </li>
                          <li>
                            <strong>If you fail to comply with your obligations under these Terms and Conditions, including any incident involving payment of the price of an order for any Goods, this may (in our sole discretion with or without notice to you) lead to a suspension and/or termination of your access to the Website without any prejudice to any claims for damages or otherwise that we may have against you.</strong>
                          </li>
                          <li>
                            <strong>FlexiPay is entitled, for purposes of preventing suspected fraud and/or where it suspects that you are abusing the Website and/or have created multiple user profiles to take advantage of a promotion or Coupon intended by FlexiPay to be used once-off by you, to blacklist you on its database (including suspending or terminating your access to the Website), refuse to accept or process payment on any order, and/or to cancel any order concluded between you and FlexiPay, in whole or in part, on notice to you. FlexiPay shall only be liable to refund monies already paid by you (see FlexiPay’s Returns Policy in this regard), and accepts no other liability which may arise as a result of such blacklisting and/or refusal to process any order.</strong>
                          </li>
                          <li>
                            At any time, you can choose to stop using the Website, with or without notice to FlexiPay.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Governing law and jurisdiction " />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            These Terms and Conditions and our relationship and/or any dispute arising from or in connection with these Terms and Conditions shall be governed and interpreted in accordance with the laws of the Federal Republic of Nigeria. Your continued use of the Website will constitute your consent and submission to the jurisdiction of the Nigerian courts regarding all proceedings, transactions, applications or the like instituted by either party against the other, arising from any of these Terms and Conditions.
                          </li>
                          <li>
                            Nothing in this clause 20 or the Terms and Conditions limits your right to approach any court, tribunal or forum of competent jurisdiction.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Notices" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            FlexiPay hereby selects 20 Idiagbon Road, Port Harcourt,  as its address for the service of all formal notices and legal processes in connection with these Terms and Conditions (“legal address”). FlexiPay may change this address from time to time by updating these Terms and Conditions.
                          </li>
                          <li>
                            You hereby select the delivery address specified with your order as your legal address, but you may change it to any other physical address  by giving FlexiPay not less than 7 days’ notice in writing.
                          </li>
                          <li>
                            Notices must be sent either by hand, or email and must be in English. All notices sent -
                          </li>
                          <ul className="list-disc px-4">
                            <li>
                              by hand will be deemed to have been received on the date of delivery;
                            </li>
                            <li>
                            by email will be deemed to have been on the date indicated in the “Read Receipt” notification.<strong>ALL EMAIL COMMUNICATIONS BETWEEN YOU AND US MUST MAKE USE OF THE “READ RECEIPT” FUNCTION </strong> to serve as proof that an email has been received.
                            </li>
                          </ul>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="Complaints " />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                          If you have a complaint about the goods or services provided by us or require information regarding our internal complaints-handling process, please get in touch with us via our Help page on the Website or you can contact our call centre on 09020130444.
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full">
                      <TextHeader title="General" />
                      <div className="text-[#000541] my-3">
                        <ul className="list-disc px-4">
                          <li>
                            FlexiPay may, in its sole discretion, at any time and for any reason and without prior written notice, suspend or terminate the operation of the Website or the user’s right to use the Website or any of its contents subject to us processing any orders then already made by you.
                          </li>
                          <ul className="list-disc px-4">
                            <li>
                              You may not cede, assign, or otherwise transfer your rights and obligations in terms of these Terms and Conditions to any third party.
                            </li>
                            <li>
                              Any failure on the part of you or FlexiPay to enforce any right in terms hereof shall not constitute a waiver of that right.
                            </li>
                            <li>
                              If any term or condition contained herein is declared invalid, the remaining terms and conditions will remain in full force and effect.
                            </li>
                            <li>
                              No variation, addition, deletion, or agreed cancellation of the Terms and Conditions will be of any force or effect unless in writing and accepted by or on behalf of the parties hereto.
                            </li>
                            <li>
                              No indulgence, extension of time, relaxation, or latitude which any party (the “grantor”) may show grant or allow to the other (the “grantee”) shall constitute a waiver by the grantor of any of the grantor’s rights and the grantor shall not thereby be prejudiced or stopped from exercising any of its rights against the grantee which may have arisen in the past or which might arise in the future.
                            </li>
                            <li>
                            These Terms and Conditions contain the whole agreement between you and FlexiPay and no other warranty or undertaking is valid, unless contained in this document between the parties.
                            </li>
                          </ul>
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