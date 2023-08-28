import React from "react";
const End = () => {
    return(
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Контакты</h3>
        <p>Телефон: 123-456-7890</p>
      </div>
      <div class="footer-section">
        <h3>Информация</h3>
        <ul>
          <li><a href="#">Политика конфиденциальности</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Подписка</h3>
        
        <form class="subscribe-form">
          <input type="email" placeholder="Введите ваш email"/>
          <button type="submit">Подписаться</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2022 Магазин одежды. Все права защищены.</p>
    </div>
  </div>
</footer>
    )
}
export default End