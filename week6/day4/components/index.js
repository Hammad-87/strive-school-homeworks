const LoaderComponent = () => `
   <div class="ui active dimmer">
    <div class="ui text loader">Loading</div>
  </div>`;

const SearchPlaceHolderComponent = (query) => `
  <div class="ui placeholder segment">
        <div class="ui icon header">
            <i class="search icon"></i>
            We couldn't find any books with the name '${query}'
        </div>
    </div>
    `;

const BookItemComponent = (book, exists) => `
    <div class="image">
          <img class="ui image centered small" src=${book.img}>
        </div>
        <div class="content">
        
          <a class="header">${book.title}</a>
          
          <div class="meta">
         <a class="ui red horizontal label">${book.category.toUpperCase()}</a>
        
          </div>
  
        </div>
       <div class="ui right floated actions">
            <h4>${book.price} €</h4>
                 <div class="extra">
    <div
    id="remove-item-${book.asin}"
    class="ui vertical animated basic mini  button" tabindex="0">
            <div class="hidden content">
            Skip
        </div>
        <div class="visible content">
           <i class="eye slash icon"></i>
        </div>
        </div>
       <div 
       id="add-item-${book.asin}"
       class="ui vertical animated secondary mini button add-button" tabindex="0">
            <div class="hidden content">
            Add
        </div>
        <div class="visible content">
          <i class="shop icon"></i>
         ${exists ? exists.quantity : 0}
        </div>
        </div>
            </div> 
        
        </div>
        
     `;
const BookItemCart = (item) => `

        <div class="right floated content">
            <button
                       id="remove-btn-${item.asin}"
                         class="mini ui icon red button fluid">
                        <i class="trash icon"></i>
                        </button>
            </div>
            <img class="ui mini  image" src=${item.img}></img>
            <div class="content">
                   ${item.title.substring(0, 35)} 
                  <div class="description">Quantity : ${item.quantity}
               
                  </div>
                  <div class="description">${(
                    item.price * item.quantity
                  ).toFixed(2)} €</div>
                      
            </div>
      `;
const EmptyCartComponent = () => `
    <div class="ui centered piled empty-cart">
    <i class="shop icon"></i>
    Your Cart Is Empty
    </div>
    
    `;
const AddButton = (quantity) => `   <div class="hidden content">
            Add
        </div>
        <div class="visible content">
           <i class="shop icon"></i>
           ${quantity}
        </div>
        </div>
            </div> `;
