<?php
$topic     = $_GET['topic'] ?? '';
$version   = $_GET['version'] ?? '';
$component = $_GET['component'] ?? '';
$release   = $_GET['release'] ?? 'latest';

if ($topic === '' || $version === '' || $component === '') {
    header('Location: https://isotc204.org/ritso/', true, 303);
    exit;
}

// Convert UpperCamelCase to lower-kebab-case
$kebab = preg_replace_callback('/([a-z0-9])([A-Z])/', function ($matches) {
    return $matches[1] . '-' . strtolower($matches[2]);
}, $component);
$kebab = strtolower($kebab);

$base = "https://isotc204.org/ontology-its-{$topic}-v{$version}/{$release}";

$wantsHtml = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'text/html') !== false;

if (stripos($component, 'SHACL') !== false) {
    // SHACL modules → always .ttl (no HTML docs page)
    $target = "{$base}/{$kebab}.ttl";
} elseif (stripos($component, 'Pattern') !== false) {
    // Pattern modules: HTML → class docs; RDF → module .ttl
    $target = $wantsHtml
        ? "{$base}/classes/{$component}/"
        : "{$base}/{$kebab}.ttl";
} elseif (preg_match('/^[A-Z]/', $component)) {
    // Class (UpperCamelCase)
    $target = $wantsHtml
        ? "{$base}/classes/{$component}/"
        : "{$base}/its-{$topic}.ttl";
} elseif (preg_match('/^[a-z]/', $component)) {
    // Property (lowerCamelCase)
    $target = $wantsHtml
        ? "{$base}/properties/{$component}/"
        : "{$base}/its-{$topic}.ttl";
} else {
    $target = "{$base}/{$kebab}.ttl";
}

header("Location: {$target}", true, 303);
exit;
