<?php 
/*
Plugin Name: Cubeslider
Plugin URI: viankakrisna.github.io
Description: Admin panel for creating custom post types and custom taxonomies in WordPress
Author: Ade Viankakrisna Fadlil
Version: 0.1.0
Author URI: http://viankakrisna.com
Text Domain: cubeslider
License: GPLv2
*/

add_action( 'init', function(){
    wp_enqueue_script( 'cubeslider_js', plugins_url('assets/js/cubeslider.js', __FILE__), 'jquery', false, true );
    wp_enqueue_style( 'cubeslider_css', plugins_url('assets/css/cubeslider.css', __FILE__) );
});

add_shortcode('cubeslider', function( $atts, $content = null ){
    return '<div class="cubeSlider">' . do_shortcode($content) . '</div>';
});


add_action( 'after_setup_theme', 'your_name_integrateWithVC' );
function your_name_integrateWithVC() {

    vc_map( array(
        "name" => __("Cubeslider", "cubeslider"),
        "base" => "cubeslider",
        "as_parent" => array('only' => 'vc_column_text'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
        "content_element" => true,
        "show_settings_on_create" => false,
        "is_container" => true,
        "params" => array(
            // add params same as with any other content element
            array(
                'type' => 'dropdown',
                'heading' => __( 'Row stretch', 'js_composer' ),
                'param_name' => 'full_width',
                'value' => array(
                    __( 'Default', 'js_composer' ) => '',
                    __( 'Stretch row', 'js_composer' ) => 'stretch_row',
                    __( 'Stretch row and content', 'js_composer' ) => 'stretch_row_content',
                    __( 'Stretch row and content (no paddings)', 'js_composer' ) => 'stretch_row_content_no_spaces',
                ),
                'description' => __( 'Select stretching options for row and content (Note: stretched may not work properly if parent container has "overflow: hidden" CSS property).', 'js_composer' )
            ),
            array(
                'type' => 'dropdown',
                'heading' => __( 'Parallax', 'js_composer' ),
                'param_name' => 'parallax',
                'value' => array(
                    __( 'None', 'js_composer' ) => '',
                    __( 'Simple', 'js_composer' ) => 'content-moving',
                    __( 'With fade', 'js_composer' ) => 'content-moving-fade',
                ),
                'description' => __( 'Add parallax type background for row (Note: If no image is specified, parallax will use background image from Design Options).', 'js_composer' )
            ),
            array(
                'type' => 'el_id',
                'heading' => __( 'Row ID', 'js_composer' ),
                'param_name' => 'el_id',
                'description' => sprintf( __( 'Enter row ID (Note: make sure it is unique and valid according to <a href="%s" target="_blank">w3c specification</a>).', 'js_composer' ), 'http://www.w3schools.com/tags/att_global_id.asp' ),
            ),
            array(
                'type' => 'textfield',
                'heading' => __( 'Extra class name', 'js_composer' ),
                'param_name' => 'el_class',
                'description' => __( 'Style particular content element differently - add a class name and refer to it in custom CSS.', 'js_composer' ),
            ),
            array(
                'type' => 'css_editor',
                'heading' => __( 'CSS box', 'js_composer' ),
                'param_name' => 'css',
                // 'description' => __( 'Style particular content element differently - add a class name and refer to it in custom CSS.', 'js_composer' ),
                'group' => __( 'Design Options', 'js_composer' )
            ),
        ),
        "js_view" => 'VcColumnView'
    ) );

    if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
        class WPBakeryShortCode_cubeslider extends WPBakeryShortCodesContainer {
        }
    }
}