<?php get_header(); ?>

<main class="content-bg no-bg blog blog-single">
	<div class="inner">
		<?php if ( have_posts() ) : the_post(); ?>
			<h1 class="big-title"><?php the_title(); ?></h1>
			<p class="post-date"><?php the_date( 'M, Y' ); ?></p>
			<div class="content clearfix">
				<?php the_post_thumbnail( '600x400', array( 'class' => 'img-fluid wp-post-image' ) ); ?>
				<?php the_content(); ?>
			</div>
			<?php get_template_part( 'templates/archive/share-links' ); ?>
			<a class='back-to-blog'
			   href='<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>'>
				<?php _e( 'Back To Blog', 'wld' ); ?>
			</a>
		<?php endif; ?>
	</div>
</main>

<?php get_footer(); ?>
