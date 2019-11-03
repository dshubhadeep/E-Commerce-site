pragma solidity >=0.5.0 <0.7.0;

contract Shop {

    /****************
     *  PUBLIC VARS
     ***************/

    address payable public owner;
    // One-time reg. fee to allow users to put products online
    uint public regFee;
    // Track no. of products in store
    uint public productCount;
    // Track products in store
    mapping(uint => Product) public productList;

    struct Product {
        uint productId; // uid for product
        address payable sellerAddress; // address of user who is selling product
        address buyerAddress; // address of user who is buying product
        uint price; // price of product
        bytes32 name; // human readable name for product
        bytes32 imageHash; // ipfs hash for product image
        uint dateAdded; // date when product was added to store
        uint dateSold; // date when product was sold (default - 0)
        bool sold; // track if product was sold
    }

    struct User {
        uint userId; // uid for user
        uint[] itemsAdded; // ids of added items
        uint[] itemsBought; // ids of bought items
    }

    /****************
     *  PRIVATE VARS
     ***************/

    uint private userCount; // Track no. of users who have registered to store
    mapping(address => User) private registeredUsers; // Track registered users

    modifier onlyRegisteredUsers() {
        require(registeredUsers[msg.sender].userId != 0, "User is not registered");
        _;
    }

    constructor(uint _regFee) public {
        owner = msg.sender;
        regFee = _regFee;
    }

    /**
     * @dev Allows user to register, stores their wallet address
     *      and requires a reg. fee
     */
    function registerUser() public payable returns(bool registered) {
        require(registeredUsers[msg.sender].userId == 0, "User has already registered");
        require(msg.value == regFee, "Insufficient registration fee");

        userCount++;

        uint[] memory itemsAdded;
        uint[] memory itemsBought;

        registeredUsers[msg.sender] = User({
            userId: userCount,
            itemsAdded: itemsAdded,
            itemsBought: itemsBought
        });

        owner.transfer(msg.value);

        return true;
    }

    /**
     * @dev Allow user to add product to store
     * @param _name Name of product
     * @param _price Price of product
     * @param _imageHash IPFS hash of product image
     * @param _dateAdded Date the product was added to store
     */
    function addProduct(bytes32 _name, uint _price, bytes32 _imageHash, uint _dateAdded) public onlyRegisteredUsers returns(bool added) {
        productCount++;
        registeredUsers[msg.sender].itemsAdded.push(productCount);

        productList[productCount] = Product({
            productId: productCount,
            sellerAddress: msg.sender,
            buyerAddress: address(0),
            name: _name,
            price: _price,
            imageHash: _imageHash,
            dateAdded: _dateAdded,
            dateSold: 0,
            sold: false
        });

        return true;
    }

    function getUserCount() public view returns (uint count) {
        return userCount;
    }

    /**
     * @dev Allow user to buy product from store
     * @param _productId ID of product to be bought
     * @param _dateSold Date the product was sold
     */
    function buyProduct(uint _productId, uint _dateSold) public payable onlyRegisteredUsers returns (bool bought) {
        require(_productId > 0 && _productId <= productCount, "Invalid product id");
        require(!productList[_productId].sold, "Product is already sold");
        require(msg.sender != productList[_productId].sellerAddress, "Seller cannot buy item");
        require(msg.value == productList[_productId].price, "Insufficient price");

        address payable sellerAddress = productList[_productId].sellerAddress;

        // Make changes to product list
        productList[_productId].buyerAddress = msg.sender;
        productList[_productId].sold = true;
        productList[_productId].dateSold = _dateSold;

        // add item to buyer structs
        registeredUsers[msg.sender].itemsBought.push(_productId);

        // Transfer value
        sellerAddress.transfer(msg.value);

        return true;
    }

    /**
     * @dev Get user details
     * @param _userAddress address of user
     */
    function getUser(address _userAddress) public view returns
    (uint _userId,uint[] memory _itemsAdded,uint[] memory _itemsBought) {
        User memory user = registeredUsers[_userAddress];
        return (user.userId, user.itemsAdded, user.itemsBought);
    }

}