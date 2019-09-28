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
        uint sellerId; // id of user who is selling product
        uint buyerId; // id of user who is buying product
        uint price; // price of product
        bytes32 name; // human readable name for product
        bytes32 imageHash; // ipfs hash for product image
        uint dateAdded; // date when product was added to store
        uint dateSold; // date when product was sold (default - 0)
        bool sold; // track if product was sold
    }

    struct User {
        uint userId; // uid for user
        uint noOfItemsAdded; // track no. of products added by user
        uint noOfItemsBought; // track no. of products bought by user
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

        registeredUsers[msg.sender] = User({
            userId: userCount,
            noOfItemsAdded: 0,
            noOfItemsBought: 0
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
        uint sellerId = registeredUsers[msg.sender].userId;
        registeredUsers[msg.sender].noOfItemsAdded++;

        productList[productCount] = Product({
            productId: productCount,
            sellerId: sellerId,
            buyerId: 0,
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

}