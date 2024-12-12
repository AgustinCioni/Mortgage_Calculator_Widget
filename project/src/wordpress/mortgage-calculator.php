<?php
/**
 * Mortgage Calculator Integration
 * 
 * @package MortgageCalculator
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue required scripts and styles for the Mortgage Calculator
 */
function mortgage_calculator_scripts() {
    // React core
    wp_enqueue_script(
        'react',
        'https://unpkg.com/react@18.3.0/umd/react.production.min.js',
        [],
        '18.3.0',
        true
    );
    
    // React DOM
    wp_enqueue_script(
        'react-dom',
        'https://unpkg.com/react-dom@18.3.0/umd/react-dom.production.min.js',
        ['react'],
        '18.3.0',
        true
    );
    
    // Mortgage Calculator Widget
    wp_enqueue_script(
        'mortgage-calculator',
        'https://radiant-selkie-7e05f6.netlify.app/assets/index.js',
        ['react', 'react-dom'],
        '1.0.0',
        true
    );
    
    // Mortgage Calculator Styles
    wp_enqueue_style(
        'mortgage-calculator-styles',
        'https://radiant-selkie-7e05f6.netlify.app/assets/style.css',
        [],
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'mortgage_calculator_scripts');

/**
 * Create shortcode for the Mortgage Calculator
 * 
 * @return string HTML markup for the calculator
 */
function mortgage_calculator_shortcode() {
    ob_start();
    ?>
    <div id="mortgage-calculator"></div>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof window.initMortgageCalculator === 'function') {
            window.initMortgageCalculator('mortgage-calculator');
        } else {
            console.warn('Mortgage Calculator initialization function not found');
        }
    });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('mortgage_calculator', 'mortgage_calculator_shortcode');