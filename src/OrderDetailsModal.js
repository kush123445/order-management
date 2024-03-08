
function OrderDetailsModal({ order, onClose }) {


    function calculateTotalPrice(order) {
        let totalPrice = 0;
        for (let item of order.items) {
          totalPrice += item.price;
        }
        return totalPrice;
      }
    const totalPrice = calculateTotalPrice(order);
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Order Details</h2>
          {order.items.map(item => (
            <p key={item.name}>{item.name} - {item.price}</p>
          ))}
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
    );
  }
export default OrderDetailsModal