<?php
/**
 * Mortgage Calculator Widget Integration
 */
function mortgage_calculator_scripts() {
    // React with error boundary
    wp_enqueue_script(
        'react',
        'https://unpkg.com/react@18.3.0/umd/react.production.min.js',
        array(),
        '18.3.0'
    );
    
    wp_enqueue_script(
        'react-dom',
        'https://unpkg.com/react-dom@18.3.0/umd/react-dom.production.min.js',
        array('react'),
        '18.3.0'
    );
    
    // Our calculator with dependency on React
    wp_enqueue_script(
        'mortgage-calculator',
        'https://monumental-buttercream-3e0224.netlify.app/assets/index.js',
        array('react', 'react-dom'),
        '1.0.0',
        true
    );
    
    wp_enqueue_style(
        'mortgage-calculator-styles',
        'https://monumental-buttercream-3e0224.netlify.app/assets/style.css'
    );
}
add_action('wp_enqueue_scripts', 'mortgage_calculator_scripts');

function mortgage_calculator_shortcode() {
    ob_start();
    ?>
    <div id="mortgage-calculator"></div>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            if (typeof window.initMortgageCalculator === 'function') {
                window.initMortgageCalculator('mortgage-calculator');
            } else {
                console.error('Mortgage Calculator failed to initialize');
            }
        }, 100);
    });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('mortgage_calculator', 'mortgage_calculator_shortcode');