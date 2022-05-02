// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Logicst {
    enum OrderState {
        PENDING,
        APPROVE,
        SHIPPED
    }

    struct Order {
        uint orderId;
        address from;
        address to;
        string item;
        OrderState orderState;
        uint amount;
        uint atDate;
    }

    uint public orderCounter = 0;
    
    mapping(uint => Order) orderList;
  
    function transferToContract() public payable {}

    function orderItem(string memory item, address mAddress) public payable returns(Order memory) {
        orderList[orderCounter] = Order({orderId: orderCounter, from: msg.sender, to: mAddress, item: item, orderState: OrderState.PENDING, amount: msg.value, atDate: block.timestamp});
        orderCounter++;
        return orderList[orderCounter - 1];
    }

    function getAllOrderedItem() public view returns(Order[] memory) {
        Order[] memory orders = new Order[](orderCounter);
        for (uint i = 0; i < orderCounter; i++) {
            orders[i] = orderList[i];
        }
        return orders;
    }

    function getOrderByIndex(uint index) public view returns(Order memory) {
        return orderList[index];
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}